import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const { login, loginWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setError("");
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        setError("Bu email adresi ile kayıtlı kullanıcı bulunamadı");
      } else if (error.code === "auth/wrong-password") {
        setError("Hatalı şifre");
      } else if (error.code === "auth/invalid-email") {
        setError("Geçersiz email adresi");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin."
        );
      } else if (error.code === "auth/invalid-credential") {
        setError(
          "Geçersiz kimlik bilgileri. Lütfen email ve şifrenizi kontrol edin."
        );
      } else if (error.code === "auth/missing-password") {
        setError("Lütfen şifrenizi girin");
      } else if (error.code === "auth/invalid-login-credentials") {
        setError("Email adresi veya şifre hatalı");
      } else {
        setError(
          "Giriş yapılamadı: " + (error.message || "Lütfen tekrar deneyin.")
        );
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Google ile giriş işlemi iptal edildi.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setError("Google giriş penceresi zaten açık.");
      } else if (error.code === "auth/popup-blocked") {
        setError(
          "Giriş penceresi tarayıcı tarafından engellendi. Lütfen popup engellemeyi kaldırın."
        );
      } else {
        setError(
          "Google ile giriş yapılırken bir hata oluştu: " +
            (error.message || "Lütfen tekrar deneyin.")
        );
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Giriş Yap
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:text-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Google ile Giriş Yap
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              veya
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email alanı zorunludur",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Geçerli bir email adresi giriniz",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Şifre alanı zorunludur",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Şifremi Unuttum
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Şifremi Unuttum
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Hesabınız yok mu?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Hesap Oluştur
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
