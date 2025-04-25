import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  signup,
  resetPassword,
} from "../redux/slices/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { profile, loading: reduxLoading } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            dispatch(login.fulfilled({ ...user, ...userDoc.data() }));
          } else {
            dispatch(login.fulfilled(user));
          }
        } else {
          dispatch(logout.fulfilled());
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      } finally {
        setLoading(false);
        setAuthInitialized(true);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signupUser = async (email, password, name, surname, username) => {
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
        username: username
          ? username.toLowerCase()
          : email.split("@")[0].toLowerCase() +
            Math.random().toString(36).substring(2, 7),
        createdAt: new Date(),
        updatedAt: new Date(),
        totalViews: 0,
        monthlyStats: {},
      };

      await setDoc(userRef, userData);
      return { ...user, ...userData };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const nameParts = user.displayName
          ? user.displayName.split(" ")
          : ["", ""];
        const name = nameParts[0] || "";
        const surname = nameParts.slice(1).join(" ") || "";
        const username =
          user.email.split("@")[0].toLowerCase() +
          Math.random().toString(36).substring(2, 5);

        const userData = {
          email: user.email,
          name: name,
          surname: surname,
          displayName: user.displayName || `${name} ${surname}`,
          username: username,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
          updatedAt: new Date(),
          totalViews: 0,
          monthlyStats: {},
        };

        await setDoc(userRef, userData);
        return { ...user, ...userData };
      }

      return { ...user, ...userDoc.data() };
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const resetUserPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    currentUser: profile,
    isAuthenticated: !!profile,
    loading: loading || reduxLoading,
    authInitialized,
    signup: (email, password, name, surname, username) => {
      return signupUser(email, password, name, surname, username)
        .then((userData) => {
          dispatch(signup.fulfilled(userData));
          return userData;
        })
        .catch((error) => {
          dispatch(signup.rejected(error.message));
          throw error;
        });
    },
    login: (email, password) => {
      return loginUser(email, password)
        .then((user) => {
          return user;
        })
        .catch((error) => {
          dispatch(login.rejected(error.message));
          throw error;
        });
    },
    loginWithGoogle: () => {
      return loginWithGoogle()
        .then((userData) => {
          dispatch(login.fulfilled(userData));
          return userData;
        })
        .catch((error) => {
          dispatch(login.rejected(error.message));
          throw error;
        });
    },
    logout: () => {
      return logoutUser()
        .then(() => {
          dispatch(logout.fulfilled());
          return true;
        })
        .catch((error) => {
          dispatch(logout.rejected(error.message));
          throw error;
        });
    },
    resetPassword: (email) => {
      return resetUserPassword(email)
        .then(() => {
          dispatch(resetPassword.fulfilled());
          return true;
        })
        .catch((error) => {
          dispatch(resetPassword.rejected(error.message));
          throw error;
        });
    },
  };

  if (loading && !authInitialized) {
    return <Loading message="Oturum bilgileri kontrol ediliyor..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
