import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "IyiLink nedir?",
      answer:
        "IyiLink, tüm dijital bağlantılarınızı tek bir profil altında toplamanıza olanak tanıyan bir platformdur. Sosyal medya hesaplarınızı, portfolyo çalışmalarınızı, iletişim bilgilerinizi ve daha fazlasını tek bir URL ile paylaşabilirsiniz.",
    },
    {
      question: "IyiLink'i nasıl kullanabilirim?",
      answer:
        "IyiLink'i kullanmak için öncelikle bir hesap oluşturmanız gerekir. Kaydolduktan sonra, kişiselleştirilmiş profilinizi oluşturabilir ve bağlantılarınızı ekleyebilirsiniz. Ardından, benzersiz IyiLink URL'nizi paylaşarak tüm içeriklerinize tek bir yerden erişim sağlayabilirsiniz.",
    },
    {
      question: "IyiLink ücretsiz mi?",
      answer:
        "Evet, IyiLink'in temel özellikleri tamamen ücretsizdir. Ancak, gelişmiş analitik, özel tema seçenekleri ve diğer premium özellikler için ücretli abonelik planlarımız bulunmaktadır.",
    },
    {
      question: "Premium özellikleri nasıl kullanabilirim?",
      answer:
        "Premium özelliklere erişmek için hesap sayfanızdaki 'Premium'a Yükselt' butonuna tıklayabilir ve size en uygun abonelik planını seçebilirsiniz. Ödeme işleminiz tamamlandıktan sonra premium özellikler hesabınızda otomatik olarak aktifleşecektir.",
    },
    {
      question: "IyiLink URL'imi nasıl özelleştirebilirim?",
      answer:
        "Kaydolduğunuzda, sizin için benzersiz bir kullanıcı adı oluşturulur (örneğin, iyilink.co/kullaniciadi). Bu kullanıcı adını istediğiniz zaman hesap ayarlarınızdan değiştirebilirsiniz, ancak seçtiğiniz kullanıcı adının başka bir kullanıcı tarafından alınmamış olması gerekmektedir.",
    },
    {
      question:
        "Profilime ekleyebileceğim bağlantı sayısında bir sınır var mı?",
      answer:
        "Ücretsiz hesaplar için en fazla 10 bağlantı ekleyebilirsiniz. Premium abonelikle bu sınır kaldırılır ve sınırsız sayıda bağlantı ekleyebilirsiniz.",
    },
    {
      question: "Profilimi nasıl özelleştirebilirim?",
      answer:
        "Profilinizi özelleştirmek için Dashboard sayfasındaki 'Profil Düzenle' seçeneğini kullanabilirsiniz. Buradan profil resminizi, arka plan rengini, fontları ve diğer görsel öğeleri değiştirebilirsiniz. Premium kullanıcılar için daha fazla özelleştirme seçeneği mevcuttur.",
    },
    {
      question: "Profil ziyaretlerimi takip edebilir miyim?",
      answer:
        "Evet, Dashboard'da bulunan analitik bölümünden profilinizin kaç kez görüntülendiği, hangi bağlantılara tıklandığı ve ziyaretçilerinizin coğrafi dağılımı gibi istatistikleri görebilirsiniz. Daha detaylı analitik bilgiler premium kullanıcılar için sunulmaktadır.",
    },
    {
      question: "Hesabımı nasıl silebilirim?",
      answer:
        "Hesabınızı silmek için Hesap Ayarları sayfasındaki 'Hesabı Sil' butonunu kullanabilirsiniz. Hesabınızı silmeden önce tüm verilerinizi yedeklemenizi öneririz, çünkü hesap silme işlemi geri alınamaz.",
    },
    {
      question: "Teknik bir sorun yaşıyorum. Nasıl yardım alabilirim?",
      answer:
        "Teknik sorunlar için support@iyilink.co adresine e-posta gönderebilir veya İletişim sayfamızdaki formu kullanabilirsiniz. Destek ekibimiz en kısa sürede size yardımcı olacaktır.",
    },
  ];

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ color: "var(--color-dark-text)" }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        Sık Sorulan Sorular
      </h1>

      <div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <p className="mb-6">
          IyiLink hakkında en çok sorulan soruları ve yanıtlarını burada
          bulabilirsiniz. Eğer sorunuzun cevabını burada bulamazsanız, lütfen{" "}
          <a
            href="/contact"
            className="text-blue-600 hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            İletişim sayfamız
          </a>{" "}
          üzerinden bizimle iletişime geçin.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-md overflow-hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium"
                onClick={() => toggleAccordion(index)}
                style={{
                  backgroundColor:
                    activeIndex === index
                      ? "var(--color-primary-light)"
                      : "var(--color-neutral-light)",
                }}
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                  style={{ color: "var(--color-primary)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-96 p-4" : "max-h-0"
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="bg-white shadow-md rounded-lg p-6"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          Hala sorunuz mu var?
        </h2>
        <p className="mb-6">
          Bu sayfada yanıtını bulamadığınız sorularınız için destek ekibimizle
          iletişime geçebilirsiniz. Size en kısa sürede yardımcı olmaktan
          memnuniyet duyarız.
        </p>
        <div className="flex justify-center">
          <a
            href="/contact"
            className="px-6 py-2 rounded font-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Bize Ulaşın
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
