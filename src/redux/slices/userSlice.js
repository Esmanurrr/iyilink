import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password, name, surname }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${name} ${surname}`,
      });

      const userRef = doc(db, "users", user.uid);
      const userData = {
        email,
        name,
        surname,
        displayName: `${name} ${surname}`,
        username:
          email.split("@")[0].toLowerCase() +
          Math.random().toString(36).substring(2, 7),
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(userRef, userData);

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        ...userData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const profileData = userDoc.data();
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          ...profileData,
        };
      } else {
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          _firestoreMissing: true,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ uid, userData }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date(),
      });
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPublicProfile = createAsyncThunk(
  "user/fetchPublicProfile",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        return rejectWithValue("Kullanıcı ID'si gereklidir");
      }

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return rejectWithValue("Kullanıcı bulunamadı");
      }

      return {
        id: userId,
        ...userDoc.data(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfileByUsername = createAsyncThunk(
  "user/fetchProfileByUsername",
  async (username, { rejectWithValue }) => {
    try {
      if (!username) {
        return rejectWithValue("Kullanıcı adı gereklidir");
      }

      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username.toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return rejectWithValue(
          `"${username}" kullanıcı adına sahip bir profil bulunamadı.`
        );
      }

      const userDoc = querySnapshot.docs[0];
      const userData = {
        id: userDoc.id,
        ...userDoc.data(),
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const findUserByUsername = async (usernameToFind) => {
  let usersRef = collection(db, "users");

  let q = query(usersRef, where("username", "==", usernameToFind));
  let snapshot = await getDocs(q);

  if (snapshot.empty) {
    q = query(usersRef, where("username", "==", usernameToFind.toLowerCase()));
    snapshot = await getDocs(q);
  }

  if (snapshot.empty) {
    throw new Error(
      `"${usernameToFind}" kullanıcı adına sahip bir profil bulunamadı.`
    );
  }

  const userDoc = snapshot.docs[0];
  return {
    id: userDoc.id,
    ...userDoc.data(),
  };
};

const initialState = {
  profile: null,
  publicProfile: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    clearPublicProfile: (state) => {
      state.publicProfile = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Public Profile
      .addCase(fetchPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.publicProfile = action.payload;
      })
      .addCase(fetchPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Profile By Username
      .addCase(fetchProfileByUsername.pending, (state) => {
        console.log("[Redux userSlice] fetchProfileByUsername.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.publicProfile = action.payload;
      })
      .addCase(fetchProfileByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile, clearPublicProfile } = userSlice.actions;
export default userSlice.reducer;
