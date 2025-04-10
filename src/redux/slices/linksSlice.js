import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  query,
  where,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";

// Kullanıcı bağlantılarını getirme
export const fetchLinks = createAsyncThunk(
  "links/fetchLinks",
  async (userId, { rejectWithValue }) => {
    try {
      // Ensure userId exists
      if (!userId) return rejectWithValue("User ID is required");

      const linksCollectionRef = collection(db, "users", userId, "links");
      const querySnapshot = await getDocs(linksCollectionRef);

      const links = [];
      querySnapshot.forEach((doc) => {
        // Convert Firestore Timestamp to JS Date if needed
        const data = doc.data();
        const createdAt = data.createdAt
          ? new Date(data.createdAt.seconds * 1000)
          : new Date();
        const updatedAt = data.updatedAt
          ? new Date(data.updatedAt.seconds * 1000)
          : new Date();

        links.push({
          id: doc.id,
          ...data,
          createdAt,
          updatedAt,
        });
      });

      return links;
    } catch (error) {
      console.error("Error fetching links:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Public kullanıcı bağlantılarını getirme
export const fetchPublicLinks = createAsyncThunk(
  "links/fetchPublicLinks",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("Kullanıcı ID'si gereklidir");

      // Koleksiyon yolu (links) ve userId filtresi ile sorgu
      const linksQuery = query(
        collection(db, "links"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(linksQuery);
      const links = [];

      querySnapshot.forEach((doc) => {
        links.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return links;
    } catch (error) {
      console.error("Public linkleri getirme hatası:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Link tıklama sayısını artırma
export const incrementLinkClicks = createAsyncThunk(
  "links/incrementLinkClicks",
  async (linkId, { rejectWithValue }) => {
    try {
      if (!linkId) return rejectWithValue("Link ID'si gereklidir");

      const linkRef = doc(db, "links", linkId);

      // Tıklama sayısını Firestore'da güncelle
      await updateDoc(linkRef, {
        clicks: increment(1),
      });

      // Arayüz için dönen değer
      return { linkId };
    } catch (error) {
      console.error("Link tıklama sayısını güncelleme hatası:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Tek bir bağlantıyı getirme
export const fetchLinkById = createAsyncThunk(
  "links/fetchLinkById",
  async ({ userId, linkId }, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");
      if (!linkId) return rejectWithValue("Link ID is required");

      const linkDocRef = doc(db, "users", userId, "links", linkId);
      const docSnap = await getDoc(linkDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const createdAt = data.createdAt
          ? new Date(data.createdAt.seconds * 1000)
          : new Date();
        const updatedAt = data.updatedAt
          ? new Date(data.updatedAt.seconds * 1000)
          : new Date();

        return {
          id: docSnap.id,
          ...data,
          createdAt,
          updatedAt,
        };
      } else {
        return rejectWithValue("Link not found");
      }
    } catch (error) {
      console.error("Error fetching link:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Yeni bağlantı ekleme
export const createLink = createAsyncThunk(
  "links/createLink",
  async ({ userId, linkData }, { rejectWithValue }) => {
    try {
      // Ensure userId exists
      if (!userId) return rejectWithValue("User ID is required");

      // Create document reference properly
      const userDocRef = doc(db, "users", userId);
      const linksCollectionRef = collection(userDocRef, "links");

      // Sanitize and prepare link data
      const newLink = {
        title: linkData.title || "",
        url: linkData.url || "",
        icon: linkData.icon || "link",
        clicks: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add the document to Firestore
      const docRef = await addDoc(linksCollectionRef, newLink);

      // Return the new link with local dates for immediate UI update
      return {
        id: docRef.id,
        ...newLink,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error("Error creating link:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Bağlantı güncelleme
export const updateLinkById = createAsyncThunk(
  "links/updateLinkById",
  async ({ userId, linkId, linkData }, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");
      if (!linkId) return rejectWithValue("Link ID is required");

      const linkDocRef = doc(db, "users", userId, "links", linkId);

      const updatedLink = {
        ...linkData,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(linkDocRef, updatedLink);

      return {
        id: linkId,
        ...updatedLink,
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error("Error updating link:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Bağlantı silme
export const deleteLinkById = createAsyncThunk(
  "links/deleteLinkById",
  async ({ userId, linkId }, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");
      if (!linkId) return rejectWithValue("Link ID is required");

      const linkDocRef = doc(db, "users", userId, "links", linkId);
      await deleteDoc(linkDocRef);

      return linkId;
    } catch (error) {
      console.error("Error deleting link:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  links: [],
  publicLinks: [], // Public linkler için yeni state
  loading: false,
  error: null,
  isAddingLink: false,
  isEditingLink: false,
  editingLinkId: null,
  editingLink: null,
  newLink: { title: "", url: "", icon: "link" },
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    clearLinks: (state) => {
      state.links = [];
      state.error = null;
    },
    clearPublicLinks: (state) => {
      state.publicLinks = [];
    },
    setIsAddingLink: (state, action) => {
      state.isAddingLink = action.payload;
    },
    setNewLink: (state, action) => {
      state.newLink = action.payload;
    },
    updateNewLinkField: (state, action) => {
      const { field, value } = action.payload;
      state.newLink[field] = value;
    },
    resetNewLink: (state) => {
      state.newLink = { title: "", url: "", icon: "link" };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    startEditingLink: (state, action) => {
      const linkToEdit = state.links.find((link) => link.id === action.payload);
      if (linkToEdit) {
        state.isEditingLink = true;
        state.editingLinkId = action.payload;
        state.editingLink = { ...linkToEdit };
      }
    },
    stopEditingLink: (state) => {
      state.isEditingLink = false;
      state.editingLinkId = null;
      state.editingLink = null;
    },
    updateEditingLinkField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editingLink) {
        state.editingLink[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    // fetchLinks
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchPublicLinks
      .addCase(fetchPublicLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.publicLinks = action.payload;
      })
      .addCase(fetchPublicLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // incrementLinkClicks
      .addCase(incrementLinkClicks.pending, (state) => {
        // İşlem çok hızlı olduğu için loading state'i değiştirmiyoruz
      })
      .addCase(incrementLinkClicks.fulfilled, (state, action) => {
        // Tıklama sayısını artırma işlemi başarılı oldu
        // Public linkleri arasında ilgili linki bulup tıklama sayısını artır
        const { linkId } = action.payload;
        const linkIndex = state.publicLinks.findIndex(
          (link) => link.id === linkId
        );

        if (linkIndex !== -1) {
          state.publicLinks[linkIndex].clicks =
            (state.publicLinks[linkIndex].clicks || 0) + 1;
        }
      })
      .addCase(incrementLinkClicks.rejected, (state, action) => {
        state.error = action.payload;
      })

      // fetchLinkById
      .addCase(fetchLinkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinkById.fulfilled, (state, action) => {
        state.loading = false;
        // Varsa linkler listesinde güncelle
        const index = state.links.findIndex(
          (link) => link.id === action.payload.id
        );
        if (index !== -1) {
          state.links[index] = action.payload;
        }

        // Düzenleme modunda isek, düzenleme nesnesini güncelle
        if (state.editingLinkId === action.payload.id) {
          state.editingLink = action.payload;
        }
      })
      .addCase(fetchLinkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createLink
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links.push(action.payload);
        state.isAddingLink = false;
        state.newLink = { title: "", url: "", icon: "link" };
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateLinkById
      .addCase(updateLinkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLinkById.fulfilled, (state, action) => {
        state.loading = false;
        // Listede güncelle
        const index = state.links.findIndex(
          (link) => link.id === action.payload.id
        );
        if (index !== -1) {
          state.links[index] = action.payload;
        }

        // Düzenleme modunu kapat
        state.isEditingLink = false;
        state.editingLinkId = null;
        state.editingLink = null;
      })
      .addCase(updateLinkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteLinkById
      .addCase(deleteLinkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLinkById.fulfilled, (state, action) => {
        state.loading = false;
        state.links = state.links.filter((link) => link.id !== action.payload);
      })
      .addCase(deleteLinkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearLinks,
  clearPublicLinks,
  setIsAddingLink,
  setNewLink,
  updateNewLinkField,
  resetNewLink,
  setError,
  startEditingLink,
  stopEditingLink,
  updateEditingLinkField,
} = linksSlice.actions;
export default linksSlice.reducer;
