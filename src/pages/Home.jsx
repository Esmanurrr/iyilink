import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

export default function Home() {
  const { currentUser, loading, authInitialized } = useAuth();

  // Auth durumu yükleniyorsa loading göster
  if (loading || !authInitialized) {
    return <Loading message="Sayfa hazırlanıyor..." />;
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: "var(--color-dark-text)" }}
          >
            Tüm Bağlantılarınız İçin Tek Yer
          </h1>
          <p
            className="text-xl md:text-2xl mb-10"
            style={{ color: "var(--color-light-text)" }}
          >
            Sosyal medya hesaplarınızı, websitelerinizi ve daha fazlasını tek
            bir bağlantıda toplayın.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                Dashboard'a Git
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 font-medium rounded-lg transition-colors"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  Ücretsiz Kayıt Ol
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 font-medium rounded-lg transition-colors border"
                  style={{
                    backgroundColor: "var(--color-neutral-light)",
                    color: "var(--color-primary)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  Giriş Yap
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--color-dark-text)" }}
          >
            Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="p-6 rounded-lg shadow-sm"
              style={{ backgroundColor: "var(--color-neutral-light)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Kolay Kullanım
              </h3>
              <p style={{ color: "var(--color-light-text)" }}>
                Dakikalar içinde kayıt olun ve bağlantılarınızı tek bir yerde
                toplamaya başlayın.
              </p>
            </div>

            <div
              className="p-6 rounded-lg shadow-sm"
              style={{ backgroundColor: "var(--color-neutral-light)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Özelleştirilebilir
              </h3>
              <p style={{ color: "var(--color-light-text)" }}>
                Profilinizi kendi tarzınıza göre özelleştirin ve benzersiz bir
                görünüm oluşturun.
              </p>
            </div>

            <div
              className="p-6 rounded-lg shadow-sm"
              style={{ backgroundColor: "var(--color-neutral-light)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Analitikler
              </h3>
              <p style={{ color: "var(--color-light-text)" }}>
                Ziyaretçi istatistiklerinizi takip edin ve hangilerinin en
                popüler olduğunu görün.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Bugün Başlayın</h2>
          <p className="text-xl mb-8 opacity-90">
            İyiLink ile tüm bağlantılarınızı tek bir URL altında paylaşmaya
            başlayın.
          </p>
          {!currentUser && (
            <Link
              to="/signup"
              className="px-8 py-3 font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: "white",
                color: "var(--color-primary)",
              }}
            >
              Ücretsiz Hesap Oluştur
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
