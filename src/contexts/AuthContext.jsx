import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password, name, surname) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          email,
          displayName: `${name} ${surname}`,
        };
        setCurrentUser(mockUser);
        resolve(mockUser);
      }, 800);
    });
  }

  function login(email, password) {
    // Burada firebase veya başka bir auth servisi kullanılabilir
    // Şimdilik mock bir işlem yapıyoruz
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo için basit kontrol
        if (email === "demo@example.com" && password === "password") {
          const user = { email, id: "123456" };
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error("Email veya şifre hatalı"));
        }
      }, 1000);
    });
  }

  function logout() {
    // Burada firebase veya başka bir auth servisi kullanılabilir
    // Şimdilik mock bir işlem yapıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("user");
        setCurrentUser(null);
        resolve();
      }, 500);
    });
  }

  function resetPassword(email) {
    // Burada firebase veya başka bir auth servisi kullanılabilir
    // Şimdilik mock bir işlem yapıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Şifre sıfırlama linki ${email} adresine gönderildi`);
        resolve();
      }, 1000);
    });
  }

  function updateUserProfile(user, profile) {
    // Burada firebase veya başka bir auth servisi kullanılabilir
    // Şimdilik mock bir işlem yapıyoruz
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...profile };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        resolve(updatedUser);
      }, 800);
    });
  }

  useEffect(() => {
    // Sayfa yüklendiğinde local storage'dan kullanıcı bilgisini kontrol et
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
