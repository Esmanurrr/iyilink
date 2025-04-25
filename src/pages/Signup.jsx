import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

export default function Signup() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const { signup, loginWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    try {
      setError("");
      await signup(
        data.email,
        data.password,
        data.name,
        data.surname,
        data.username
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Bu email adresi zaten kullanımda");
      } else if (error.code === "auth/weak-password") {
        setError("Şifre en az 6 karakter olmalıdır");
      } else if (error.code === "auth/invalid-email") {
        setError("Geçersiz email adresi");
      } else if (error.code === "auth/operation-not-allowed") {
        setError(
          "Email/Şifre kimlik doğrulaması devre dışı bırakılmış. Sistem yöneticisiyle iletişime geçin."
        );
      } else if (error.message && error.message.includes("username")) {
        setError(error.message); // Kullanıcı adı ile ilgili özel hata mesajları
      } else {
        setError(
          "Hesap oluşturulamadı: " + (error.message || "Lütfen tekrar deneyin.")
        );
      }
    }
  };

  // Google ile hesap oluşturma (aslında Google ile giriş ile aynı)
  const handleGoogleSignup = async () => {
    try {
      setError("");
      await loginWithGoogle(); // Google ile oturum açınca, kullanıcı yoksa otomatik oluşturulur
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Google ile kayıt işlemi iptal edildi.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setError("Google kayıt penceresi zaten açık.");
      } else if (error.code === "auth/popup-blocked") {
        setError(
          "Kayıt penceresi tarayıcı tarafından engellendi. Lütfen popup engellemeyi kaldırın."
        );
      } else {
        setError(
          "Google ile kayıt yapılırken bir hata oluştu: " +
            (error.message || "Lütfen tekrar deneyin.")
        );
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Hesap Oluştur
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:text-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Google ile Kaydol butonu ekle */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Google ile Kaydol
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ad
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Ad alanı zorunludur" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="surname"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Soyad
              </label>
              <input
                type="text"
                id="surname"
                {...register("surname", { required: "Soyad alanı zorunludur" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.surname && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.surname.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Kullanıcı Adı
            </label>
            <div className="relative flex">
              <div className="flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-3 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                iyilink.co/
              </div>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "Kullanıcı adı zorunludur",
                  pattern: {
                    value: /^[a-z0-9_-]+$/i,
                    message:
                      "Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir",
                  },
                  setValueAs: (value) => value.toLowerCase(),
                })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="kullanici-adim"
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </span>
            )}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Profilinizin bağlantısı: iyilink.co/
              {watch("username") || "kullanici-adim"}
            </p>
          </div>

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

          <div className="mb-4">
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
                  minLength: {
                    value: 6,
                    message: "Şifre en az 6 karakter olmalıdır",
                  },
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
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              En az 6 karakter olmalıdır
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Şifre Tekrar
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Şifre tekrar alanı zorunludur",
                  validate: (value) =>
                    value === watch("password") || "Şifreler eşleşmiyor",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400"
                onClick={togglePasswordConfirmVisibility}
              >
                {showPasswordConfirm ? (
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
            {errors.passwordConfirm && (
              <span className="text-red-500 text-xs mt-1">
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Zaten bir hesabınız var mı?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Giriş Yap
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
