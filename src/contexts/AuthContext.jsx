import { createContext, useContext, useEffect } from "react";
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

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { profile: currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
    });

    return unsubscribe;
  }, [dispatch]);

  const value = {
    currentUser,
    signup: (email, password, name, surname) =>
      dispatch(signup({ email, password, name, surname })),
    login: (email, password) => dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
    resetPassword: (email) => dispatch(resetPassword(email)),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
