import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Görüntülenme sayısını artır
export const incrementProfileView = createAsyncThunk(
  "stats/incrementProfileView",
  async ({ userId, username }, { rejectWithValue, dispatch }) => {
    console.log(
      `[StatsSlice] 🔍 incrementProfileView başlatıldı: userId=${userId}, username=${username}`
    );

    try {
      // Kullanıcı belgesine referans
      const userRef = doc(db, "users", userId);
      console.log(
        `[StatsSlice] 📌 Kullanıcı referansı oluşturuldu: ${userRef.path}`
      );

      // Mevcut ay formatı (YYYY-MM)
      const currentMonth = new Date().toISOString().slice(0, 7);
      console.log(`[StatsSlice] 📅 Mevcut ay: ${currentMonth}`);

      // Önce belgeyi kontrol et
      console.log(`[StatsSlice] 🔍 Mevcut belgeyi kontrol ediyor...`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        console.log(
          `[StatsSlice] ✅ Belge mevcut. Mevcut veriler:`,
          JSON.stringify(docSnap.data(), null, 2)
        );
        const userData = docSnap.data();

        // Mevcut değerleri al (veya 0 olarak başlat)
        const currentTotal = userData.totalViews || 0;
        const monthlyStats = userData.monthlyStats || {};
        const currentMonthly = monthlyStats[currentMonth] || 0;

        console.log(
          `[StatsSlice] 📊 Mevcut değerler: total=${currentTotal}, ${currentMonth}=${currentMonthly}`
        );

        // Yeni değerleri hazırla
        const newTotal = currentTotal + 1;
        const newMonthlyStats = { ...monthlyStats };
        newMonthlyStats[currentMonth] = currentMonthly + 1;

        console.log(
          `[StatsSlice] 🔄 Yeni değerler hazırlandı: totalViews=${newTotal}, monthlyStats.${currentMonth}=${newMonthlyStats[currentMonth]}`
        );

        // Güncelleme için hazırlanan veri objesi
        const updateData = {
          totalViews: newTotal,
          monthlyStats: newMonthlyStats,
        };

        console.log(
          `[StatsSlice] 📝 Veritabanına yazılacak veri:`,
          JSON.stringify(updateData, null, 2)
        );

        // Alanları güncelle - setDoc kullanarak merge yapalım
        // Bu, belgedeki diğer alanları korurken sadece belirtilen alanları günceller
        await setDoc(userRef, updateData, { merge: true });

        console.log(`[StatsSlice] ✅ Veritabanı güncellendi`);

        // Son doğrulama - değişiklikleri doğrulamak için belgeyi tekrar oku
        const updatedDocSnap = await getDoc(userRef);
        if (updatedDocSnap.exists()) {
          const updatedData = updatedDocSnap.data();
          const updatedTotal = updatedData.totalViews || 0;
          const updatedMonthlyStats = updatedData.monthlyStats || {};
          const updatedMonthly = updatedMonthlyStats[currentMonth] || 0;

          console.log(
            `[StatsSlice] ✅ Doğrulama: veritabanına yazılan değerler: total=${updatedTotal}, monthly=${updatedMonthly}`
          );

          if (
            updatedTotal !== newTotal ||
            updatedMonthly !== newMonthlyStats[currentMonth]
          ) {
            console.warn(
              "[StatsSlice] ⚠️ Uyarı: Yazılan değerler ile okunan değerler arasında fark var!"
            );
          }

          // Aynı thunk'ın içinde, değerler değiştiğinde fetchTotalViews'i dispatch edelim
          // Böylece Redux store güncel kalacak
          try {
            dispatch(fetchTotalViews(userId));
          } catch (error) {
            console.error(
              "[StatsSlice] ❌ fetchTotalViews dispatch hata:",
              error
            );
          }

          return {
            total: updatedTotal,
            monthly: updatedMonthly,
          };
        }

        return {
          total: newTotal,
          monthly: newMonthlyStats[currentMonth],
        };
      } else {
        console.error(
          `[StatsSlice] ❌ Kullanıcı belgesi bulunamadı: ${userId}`
        );
        return rejectWithValue("Kullanıcı belgesi bulunamadı");
      }
    } catch (error) {
      console.error(
        "[StatsSlice] ❌ Görüntülenme sayısı artırılırken hata:",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);

// Toplam ve aylık görüntülenmeleri getir
export const fetchTotalViews = createAsyncThunk(
  "stats/fetchTotalViews",
  async (userId, { rejectWithValue }) => {
    try {
      // Kullanıcı belgesinden istatistikleri al
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return { total: 0, monthly: 0 };
      }

      const userData = userDoc.data();
      const currentMonth = new Date().toISOString().slice(0, 7);

      return {
        total: userData.totalViews || 0,
        monthly: userData.monthlyStats?.[currentMonth] || 0,
      };
    } catch (error) {
      console.error("Görüntüleme istatistikleri alınırken hata:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Fonksiyon birleştirmesi: fetchMonthlyViews ve fetchAllStats
// fetchTotalViews ile aynı işlevi görüyor, bu nedenle kolaylık için aynı fonksiyonu kullanabiliriz
export const fetchMonthlyViews = fetchTotalViews;
export const fetchAllStats = fetchTotalViews;

const initialState = {
  total: 0,
  monthly: 0,
  loading: false,
  error: null,
  incrementSuccess: false,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    resetIncrementSuccess: (state) => {
      state.incrementSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // incrementProfileView
      .addCase(incrementProfileView.pending, (state) => {
        state.incrementSuccess = false;
        state.error = null;
      })
      .addCase(incrementProfileView.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.monthly = action.payload.monthly;
        state.incrementSuccess = true;
      })
      .addCase(incrementProfileView.rejected, (state, action) => {
        state.incrementSuccess = false;
        state.error = action.payload;
      })

      // fetchTotalViews, fetchMonthlyViews, fetchAllStats
      .addCase(fetchTotalViews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalViews.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.monthly = action.payload.monthly;
        state.loading = false;
      })
      .addCase(fetchTotalViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetIncrementSuccess } = statsSlice.actions;
export default statsSlice.reducer;
