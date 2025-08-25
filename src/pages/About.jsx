import React from "react";

const About = () => {
  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ color: "var(--color-dark-text)" }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-primary-hover)" }}
      >
        Hakkımızda
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div
          className="bg-white shadow-md rounded-lg p-6"
          style={{ backgroundColor: "var(--color-background-alt)" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-primary-hover)" }}
          >
            Biz Kimiz?
          </h2>
          <p className="mb-4">
            IyiLink, 2025 yılında Türkiye'de kurulan, dijital kimlik yönetimi
            alanında yenilikçi çözümler sunan bir teknoloji girişimidir.
            Misyonumuz, insanların dijital varlıklarını tek bir platformda
            birleştirerek internet üzerindeki dağınık kimliklerini yönetmelerini
            kolaylaştırmaktır.
          </p>
          <p>
            Ekibimiz, yazılım geliştirme, kullanıcı deneyimi tasarımı ve dijital
            pazarlama alanlarında uzmanlaşmış yetenekli profesyonellerden
            oluşmaktadır. Her gün, kullanıcılarımızın dijital kimliklerini daha
            etkili bir şekilde yönetebilmeleri için çalışıyoruz.
          </p>
        </div>

        <div
          className="bg-white shadow-md rounded-lg p-6"
          style={{ backgroundColor: "var(--color-background-alt)" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--color-primary-hover)" }}
          >
            Vizyonumuz ve Misyonumuz
          </h2>
          <p className="mb-4">
            <strong>Vizyonumuz:</strong> İnternet üzerindeki dijital kimliklerin
            yönetiminde dünya lideri olmak ve kullanıcıların çevrimiçi
            varlıklarını güçlendirmek için yenilikçi çözümler sunmak.
          </p>
          <p>
            <strong>Misyonumuz:</strong> Kullanıcıların tüm dijital
            bağlantılarını tek bir platformda kolayca yönetebilmelerini
            sağlayarak, çevrimiçi kimliklerini daha profesyonel, erişilebilir ve
            güvenli hale getirmek.
          </p>
        </div>
      </div>

      <div
        className="bg-white shadow-md rounded-lg p-6 mb-12"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <h2
          className="text-xl font-semibold mb-6"
          style={{ color: "var(--color-primary-hover)" }}
        >
          Hikayemiz
        </h2>

        <div className="space-y-6">
          <p>
            IyiLink'in hikayesi, kurucumuzun dijital kimlik karmaşası yaşaması
            ile başladı. Farklı sosyal medya platformları, iş ağları, portfolyo
            siteleri ve iletişim kanalları arasında bölünmüş dijital kimliğini
            yönetmenin zorluğunu yaşayan kurucumuz, tüm bu platformları tek bir
            noktada birleştiren bir çözüm hayal etti.
          </p>

          <p>
            2023 yılında küçük bir ekiple yola çıktık. İlk prototipimizi
            geliştirdikten sonra, kullanıcı geri bildirimleri doğrultusunda
            platformumuzu sürekli iyileştirdik. Zaman içinde, sadece
            bağlantıları bir araya getiren basit bir araçtan, kapsamlı bir
            dijital kimlik yönetim platformuna dönüştük.
          </p>

          <p>
            Bugün, IyiLink olarak binlerce kullanıcıya hizmet veriyoruz.
            Kullanıcılarımız arasında bireysel profesyoneller, içerik
            üreticileri, sanatçılar, girişimciler ve küçük işletmeler
            bulunmaktadır. Her biri, dijital varlıklarını daha etkili bir
            şekilde yönetmek ve çevrimiçi görünürlüklerini artırmak için
            platformumuzu kullanmaktadır.
          </p>
        </div>
      </div>

      <div
        className="bg-white shadow-md rounded-lg p-6 mb-12"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <h2
          className="text-xl font-semibold mb-6"
          style={{ color: "var(--color-primary-hover)" }}
        >
          Değerlerimiz
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--color-primary-hover)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Yenilikçilik</h3>
            <p>
              Sürekli olarak yeni fikirler üretir ve uygularız. Statükoyu
              sorgular, sınırları zorlar ve geleceği şekillendiririz.
            </p>
          </div>

          <div className="text-center p-4">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--color-primary-hover)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Güvenlik</h3>
            <p>
              Kullanıcılarımızın güvenini en değerli varlığımız olarak görürüz.
              Verilerinizin korunması ve gizliliği bizim için önceliktir.
            </p>
          </div>

          <div className="text-center p-4">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--color-primary-hover)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Kullanıcı Odaklılık</h3>
            <p>
              Her kararımızda ve geliştirmemizde kullanıcılarımızı merkeze
              alırız. Geri bildirimler, platformumuzun gelişiminde itici güçtür.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
