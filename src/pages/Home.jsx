import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
            Tüm Bağlantılarınız İçin Tek Yer
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300">
            Sosyal medya hesaplarınızı, websitelerinizi ve daha fazlasını tek
            bir bağlantıda toplayın.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Dashboard'a Git
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ücretsiz Kayıt Ol
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors border border-gray-300 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Giriş Yap
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-300"
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
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Kolay Kullanım
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dakikalar içinde kayıt olun ve bağlantılarınızı tek bir yerde
                toplamaya başlayın.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-300"
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
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Özelleştirilebilir
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Profilinizi kendi tarzınıza göre özelleştirin ve benzersiz bir
                görünüm oluşturun.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-300"
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
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Analitikler
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ziyaretçi istatistiklerinizi takip edin ve hangilerinin en
                popüler olduğunu görün.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Bugün Başlayın</h2>
          <p className="text-xl mb-8 text-blue-100">
            İyiLink ile tüm bağlantılarınızı tek bir URL altında paylaşmaya
            başlayın.
          </p>
          {!currentUser && (
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Ücretsiz Hesap Oluştur
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
