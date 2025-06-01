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
  writeBatch,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

export const fetchLinks = createAsyncThunk(
  "links/fetchLinks",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");

      const linksCollectionRef = collection(db, "users", userId, "links");
      const q = query(linksCollectionRef, orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);

      const links = [];
      querySnapshot.forEach((doc) => {
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
          order: data.order ?? 0,
        });
      });

      return links;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublicLinks = createAsyncThunk(
  "links/fetchPublicLinks",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("Kullanıcı ID'si gereklidir");

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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublicLinksByUsername = createAsyncThunk(
  "links/fetchPublicLinksByUsername",
  async (username, { rejectWithValue }) => {
    try {
      if (!username) return rejectWithValue("Kullanıcı adı gereklidir");

      const usersRef = collection(db, "users");
      const userQuery = query(
        usersRef,
        where("username", "==", username.toLowerCase())
      );

      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        return rejectWithValue("Kullanıcı bulunamadı");
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id;

      const userLinksCollection = collection(db, "users", userId, "links");
      const userLinksQuery = query(
        userLinksCollection,
        orderBy("order", "asc")
      );
      const userLinksSnapshot = await getDocs(userLinksQuery);

      if (!userLinksSnapshot.empty) {
        const links = [];
        userLinksSnapshot.forEach((doc) => {
          links.push({
            id: doc.id,
            ...doc.data(),
            order: doc.data().order ?? 0,
          });
        });

        return links;
      }

      const linksQuery = query(
        collection(db, "links"),
        where("userId", "==", userId),
        orderBy("order", "asc")
      );

      const querySnapshot = await getDocs(linksQuery);

      if (querySnapshot.empty) {
        return [];
      }
      const links = [];
      querySnapshot.forEach((doc) => {
        links.push({
          id: doc.id,
          ...doc.data(),
          order: doc.data().order ?? 0,
        });
      });

      return links;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const incrementLinkClicks = createAsyncThunk(
  "links/incrementLinkClicks",
  async (linkId, { rejectWithValue }) => {
    try {
      if (!linkId) return rejectWithValue("Link ID'si gereklidir");

      const linkRef = doc(db, "links", linkId);

      await updateDoc(linkRef, {
        clicks: increment(1),
      });

      return { linkId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      return rejectWithValue(error.message);
    }
  }
);

export const createLink = createAsyncThunk(
  "links/createLink",
  async ({ userId, linkData }, { rejectWithValue, getState }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");

      const userDocRef = doc(db, "users", userId);
      const linksCollectionRef = collection(userDocRef, "links");

      const state = getState();
      const currentLinks = state.links.links;
      const nextOrder = currentLinks.length;

      const newLink = {
        title: linkData.title || "",
        url: linkData.url || "",
        icon: linkData.icon || "link",
        clicks: 0,
        order: nextOrder,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(linksCollectionRef, newLink);

      return {
        id: docRef.id,
        ...newLink,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      return rejectWithValue(error.message);
    }
  }
);

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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserLinks = async (userId) => {
  const linksRef = collection(db, "users", userId, "links");
  const snapshot = await getDocs(linksRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchLinksByUserId = createAsyncThunk(
  "links/fetchLinksByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("Kullanıcı ID'si gereklidir");

      const userLinksRef = collection(db, "users", userId, "links");
      const q = query(userLinksRef, orderBy("order", "asc"));
      const linksSnapshot = await getDocs(q);

      if (!linksSnapshot.empty) {
        const links = linksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          order: doc.data().order ?? 0,
        }));

        return links;
      }

      const linksQuery = query(
        collection(db, "links"),
        where("userId", "==", userId),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(linksQuery);

      if (querySnapshot.empty) {
        return [];
      }

      const links = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        order: doc.data().order ?? 0,
      }));

      return links;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const reorderLinks = createAsyncThunk(
  "links/reorderLinks",
  async ({ userId, reorderedLinks }, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");
      if (!reorderedLinks || !Array.isArray(reorderedLinks)) {
        return rejectWithValue("Invalid reordered links data");
      }

      const batch = writeBatch(db);

      reorderedLinks.forEach((link, index) => {
        const linkRef = doc(db, "users", userId, "links", link.id);
        batch.update(linkRef, {
          order: index,
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();

      return reorderedLinks.map((link, index) => ({
        ...link,
        order: index,
        updatedAt: new Date(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const migrateLinksOrder = createAsyncThunk(
  "links/migrateLinksOrder",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("User ID is required");

      const linksCollectionRef = collection(db, "users", userId, "links");
      const querySnapshot = await getDocs(linksCollectionRef);

      if (querySnapshot.empty) return [];

      const batch = writeBatch(db);
      const linksToUpdate = [];

      querySnapshot.forEach((doc, index) => {
        const data = doc.data();
        if (data.order === undefined || data.order === null) {
          const linkRef = doc.ref;
          batch.update(linkRef, {
            order: index,
            updatedAt: serverTimestamp(),
          });
          linksToUpdate.push({
            id: doc.id,
            ...data,
            order: index,
          });
        }
      });

      if (linksToUpdate.length > 0) {
        await batch.commit();
      }

      return linksToUpdate;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  links: [],
  publicLinks: [],
  currentLink: null,
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
      state.error = null;
    },
    clearCurrentLink: (state) => {
      state.currentLink = null;
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
    reorderLinksLocally: (state, action) => {
      state.links = action.payload;
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
        state.links = action.payload.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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

      .addCase(fetchPublicLinksByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicLinksByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.publicLinks = action.payload.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        });
      })
      .addCase(fetchPublicLinksByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(incrementLinkClicks.pending, () => {})
      .addCase(incrementLinkClicks.fulfilled, (state, action) => {
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

      .addCase(fetchLinkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinkById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.links.findIndex(
          (link) => link.id === action.payload.id
        );
        if (index !== -1) {
          state.links[index] = action.payload;
        }

        if (state.editingLinkId === action.payload.id) {
          state.editingLink = action.payload;
        }
      })
      .addCase(fetchLinkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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

      .addCase(updateLinkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLinkById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.links.findIndex(
          (link) => link.id === action.payload.id
        );
        if (index !== -1) {
          state.links[index] = action.payload;
        }

        state.isEditingLink = false;
        state.editingLinkId = null;
        state.editingLink = null;
      })
      .addCase(updateLinkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
      })

      .addCase(fetchLinksByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinksByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.publicLinks = action.payload.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        });
      })
      .addCase(fetchLinksByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(migrateLinksOrder.pending, () => {})
      .addCase(migrateLinksOrder.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.links = state.links
            .map((link) => {
              const updated = action.payload.find(
                (updated) => updated.id === link.id
              );
              return updated ? { ...link, order: updated.order } : link;
            })
            .sort((a, b) => (a.order || 0) - (b.order || 0));
        }
      })
      .addCase(migrateLinksOrder.rejected, (state, action) => {})

      .addCase(reorderLinks.pending, () => {})
      .addCase(reorderLinks.fulfilled, (state, action) => {
        state.links = action.payload;
      })
      .addCase(reorderLinks.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  clearLinks,
  clearPublicLinks,
  clearCurrentLink,
  setIsAddingLink,
  setNewLink,
  updateNewLinkField,
  resetNewLink,
  setError,
  startEditingLink,
  stopEditingLink,
  updateEditingLinkField,
  reorderLinksLocally,
} = linksSlice.actions;
export default linksSlice.reducer;
