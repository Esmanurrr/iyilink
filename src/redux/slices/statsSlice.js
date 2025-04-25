import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const incrementProfileView = createAsyncThunk(
  "stats/incrementProfileView",
  async ({ userId, username }, { rejectWithValue, dispatch }) => {
    try {
      const userRef = doc(db, "users", userId);

      const currentMonth = new Date().toISOString().slice(0, 7);

      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        const currentTotal = userData.totalViews || 0;
        const monthlyStats = userData.monthlyStats || {};
        const currentMonthly = monthlyStats[currentMonth] || 0;

        const newTotal = currentTotal + 1;
        const newMonthlyStats = { ...monthlyStats };
        newMonthlyStats[currentMonth] = currentMonthly + 1;

        const updateData = {
          totalViews: newTotal,
          monthlyStats: newMonthlyStats,
        };

        await setDoc(userRef, updateData, { merge: true });

        const updatedDocSnap = await getDoc(userRef);
        if (updatedDocSnap.exists()) {
          const updatedData = updatedDocSnap.data();
          const updatedTotal = updatedData.totalViews || 0;
          const updatedMonthlyStats = updatedData.monthlyStats || {};
          const updatedMonthly = updatedMonthlyStats[currentMonth] || 0;

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
        return rejectWithValue("Kullanıcı belgesi bulunamadı");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTotalViews = createAsyncThunk(
  "stats/fetchTotalViews",
  async (userId, { rejectWithValue }) => {
    try {
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
