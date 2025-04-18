import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  signup,
  resetPassword,
} from "../redux/slices/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
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
          // Kullanıcı giriş yaptığında Firestore'dan profil bilgilerini al
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

  const value = {
    currentUser: profile,
    isAuthenticated: !!profile,
    loading: loading || reduxLoading,
    authInitialized,
    signup: (email, password, name, surname, username) =>
      dispatch(signup({ email, password, name, surname, username })),
    login: (email, password) => dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
    resetPassword: (email) => dispatch(resetPassword(email)),
  };

  // Tüm uygulama çapında auth yüklenirken loading ekranı göster
  if (loading && !authInitialized) {
    return <Loading message="Oturum bilgileri kontrol ediliyor..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
