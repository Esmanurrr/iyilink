import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function EmailVerification() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, isEmailVerified, sendVerificationEmail } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (isEmailVerified) {
    return <Navigate to="/dashboard" />;
  }

  async function handleResendVerification() {
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await sendVerificationEmail();
      setMessage(
        "Doğrulama e-postası gönderildi! Lütfen e-posta kutunuzu kontrol edin."
      );
    } catch (error) {
      setError(
        "Doğrulama e-postası gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
      console.error("Email verification error:", error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            E-posta Doğrulama
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hesabınızı kullanmaya başlamadan önce e-posta adresinizi
            doğrulamanız gerekmektedir.
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <p className="text-sm text-gray-500 mb-4">
              {currentUser.email} adresine bir doğrulama e-postası gönderdik.
              Lütfen e-posta kutunuzu kontrol edin ve doğrulama bağlantısına
              tıklayın.
            </p>
          </div>

          <div>
            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading
                ? "Gönderiliyor..."
                : "Doğrulama E-postasını Tekrar Gönder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
