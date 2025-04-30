import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
} from "firebase/auth";
import Loading from "./Loading";

export default function AuthAction() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    const mode = searchParams.get("mode");
    const actionCode = searchParams.get("oobCode");

    if (!actionCode) {
      setError("Geçersiz veya süresi dolmuş işlem kodu.");
      setLoading(false);
      return;
    }

    const handleAuthAction = async () => {
      try {
        switch (mode) {
          case "resetPassword":
            // Şifre sıfırlama kodunu doğrula
            await verifyPasswordResetCode(auth, actionCode);
            setMode("resetPassword");
            break;

          case "verifyEmail":
            // Email doğrulama işlemini gerçekleştir
            await applyActionCode(auth, actionCode);
            setSuccess("E-posta adresiniz başarıyla doğrulandı!");
            setTimeout(() => navigate("/dashboard"), 3000);
            break;

          default:
            setError("Desteklenmeyen işlem türü.");
        }
      } catch (error) {
        console.error("Auth action error:", error);
        switch (error.code) {
          case "auth/expired-action-code":
            setError(
              "İşlem kodunun süresi dolmuş. Lütfen yeni bir kod talep edin."
            );
            break;
          case "auth/invalid-action-code":
            setError(
              "Geçersiz işlem kodu. Kod kullanılmış veya hatalı olabilir."
            );
            break;
          case "auth/user-disabled":
            setError("Bu hesap devre dışı bırakılmış.");
            break;
          case "auth/user-not-found":
            setError("Kullanıcı bulunamadı.");
            break;
          default:
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      } finally {
        setLoading(false);
      }
    };

    handleAuthAction();
  }, [searchParams, navigate]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const actionCode = searchParams.get("oobCode");

    if (!newPassword || newPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, actionCode, newPassword);
      setSuccess("Şifreniz başarıyla güncellendi!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Şifre güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="İşleminiz gerçekleştiriliyor..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {mode === "resetPassword" && !success && (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Yeni Şifre Belirleme
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
              <div>
                <label htmlFor="password" className="sr-only">
                  Yeni Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Yeni şifreniz"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {loading ? "İşleniyor..." : "Şifreyi Güncelle"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
