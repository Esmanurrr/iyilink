import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import phones from "/phones.png";
import easyUse from "/easy-use.svg";
import featured from "/featured.svg";
import analytics from "/analytics.svg";
import heart from "/heart.svg";

export default function Home() {
  const { currentUser, loading, authInitialized } = useAuth();

  if (loading || !authInitialized) {
    return <Loading message="Sayfa hazırlanıyor..." />;
  }

  return (
    <>
      <section className="home-section">
        <div className="container mx-auto flex flex-col md:flex-row relative justify-between z-10">
          <div className="flex-1 p-4 text-center md:text-left md:p-16 flex flex-col justify-center">
            <h1
              className="font-baloo text-4xl md:text-6xl mb-6 font-bold text-white leading-tight"
              style={{ color: "var(--color-neutral-light)" }}
            >
              Tüm <br /> bağlantılarınız <br /> için tek yer
            </h1>
            <p
              className="text-lg md:text-xl self-center mb-6 md:mb-10 text-gray-300 max-w-md"
              style={{ color: "var(--color-neutral-light)" }}
            >
              Sosyal medya hesaplarınızı, websitelerinizi ve daha fazlasını tek
              bir bağlantıda toplayın.
            </p>
            <div className="flex flex-col md:flex-row md:justify-start  gap-4 justify-center">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-3 font-medium rounded-3xl transition-colors"
                  style={{
                    backgroundColor: "var(--color-white-bg)",
                    color: "black",
                  }}
                >
                  Dashboard'a Git
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-8 py-3 font-medium rounded-3xl transition-colors"
                    style={{
                      backgroundColor: "var(--color-white-bg)",
                      color: "black",
                    }}
                  >
                    Ücretsiz Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 relative flex items-center justify-center w-full mb-6 md:mb-2">
            <img
              src={phones}
              alt="Phones"
              className="h-72 sm:h-80 md:h-96 object-contain relative z-10"
            />
          </div>
        </div>
      </section>

      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <div className="container mx-auto max-w-6x mt-10">
          <h2
            className="text-5xl font-baloo text-center mb-12"
            style={{ color: "var(--color-dark-text)" }}
          >
            İyilink'le beğen, <br />
            <span style={{ color: "var(--color-primary-hover)" }}>
              İyilink'le
            </span>{" "}
            paylaş.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="p-6 border border-gray-200 rounded-3xl shadow-sm text-center"
              style={{ backgroundColor: "var(--color-neutral-light)" }}
            >
              <img
                src={easyUse}
                alt="Kolay Kullanım"
                className="mx-auto mb-4"
              />
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
              className="p-6 border border-gray-200 rounded-3xl shadow-sm text-center"
              style={{ borderColor: "var(--color-neutral-dark)" }}
            >
              <img
                src={featured}
                alt="Özelleştirilebilir"
                className="mx-auto mb-4"
              />
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
              className="p-6 border border-gray-200 rounded-3xl shadow-sm text-center"
              style={{ backgroundColor: "var(--color-neutral-light)" }}
            >
              <img src={analytics} alt="Analitikler" className="mx-auto mb-4" />
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

      <section className="py-16">
        <div className="container mx-auto text-center max-w-3xl">
          <img src={heart} alt="Kalp" className="mx-auto mb-20" />
          <p className="text-2xl mb-8 opacity-70">
            İyilink, dijital dünyadaki tüm bağlantılarınızı tek bir linkte
            toplamanızı sağlayan akıllı ve sade bir platformdur. Sosyal medya
            biyonuza koyabileceğiniz bu tek bağlantıyla, takipçilerinizi tüm
            projelerinize, hesaplarınıza ve içeriklerinize yönlendirin.
          </p>
          <p className="text-3xl font-baloo mb-20">
            Bağlantılarınız dağınık olmasın, hepsi tek bir yerde birleşsin!
          </p>
          {!currentUser && (
            <Link
              to="/signup"
              className="px-10 py-4 w-1/2 text-3xl font-baloo rounded-full transition-colors"
              style={{
                backgroundColor: "var(--color-dark-text)",
                color: "var(--color-primary)",
              }}
            >
              Ücretsiz Kayıt Ol
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
