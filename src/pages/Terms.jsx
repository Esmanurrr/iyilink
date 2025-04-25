import React from "react";

const Terms = () => {
  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ color: "var(--color-dark-text)" }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        Kullanım Şartları
      </h1>

      <div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <p className="mb-6">Son güncelleme: 01.07.2023</p>

        <div className="prose max-w-none">
          <p>
            IyiLink'i kullanmadan önce lütfen aşağıdaki kullanım şartlarını
            dikkatlice okuyunuz. Bu platformu kullanarak, aşağıdaki şartları ve
            koşulları kabul etmiş olursunuz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">1. Hizmet Tanımı</h2>
          <p>
            IyiLink, kullanıcıların dijital kimliklerini yönetmelerine ve
            çeşitli platformlardaki linklerini tek bir yerde toplamalarına
            olanak sağlayan bir hizmettir. Bu hizmet, kullanıcıların kişisel
            profil sayfaları oluşturmasına ve çeşitli sosyal medya hesaplarını,
            portfolyo çalışmalarını ve iletişim bilgilerini paylaşmasına imkan
            tanır.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            2. Hesap Kaydı ve Güvenlik
          </h2>
          <p>
            IyiLink'i kullanabilmek için, geçerli bir e-posta adresi ile hesap
            oluşturmanız gerekmektedir. Hesap güvenliğinizden ve gizliliğinizden
            tamamen siz sorumlusunuz. Hesabınızla ilgili her türlü şüpheli
            aktiviteyi derhal bildirmeniz gerekmektedir.
          </p>
          <p>
            Hesap bilgilerinizin gizliliğini korumanız ve hesabınızla ilgili tüm
            aktivitelerden sorumlu olduğunuzu kabul etmeniz gerekmektedir.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            3. Kullanıcı Davranışları
          </h2>
          <p>
            IyiLink hizmetlerini kullanırken, aşağıdaki kurallara uymanız
            gerekmektedir:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Başkalarının haklarına saygı göstermek</li>
            <li>Yasalara ve düzenlemelere uymak</li>
            <li>Yanıltıcı, aldatıcı veya sahte içerik paylaşmamak</li>
            <li>Başkalarının kişisel bilgilerini izinsiz paylaşmamak</li>
            <li>
              Platform bütünlüğünü bozacak teknik müdahalelerde bulunmamak
            </li>
            <li>
              Zararlı yazılım, virüs veya diğer kötü amaçlı kodlar yaymamak
            </li>
          </ul>
          <p>
            IyiLink, bu kurallara uymayan kullanıcıların hesaplarını geçici veya
            kalıcı olarak askıya alma hakkını saklı tutar.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            4. İçerik Politikası
          </h2>
          <p>
            IyiLink profilinizde paylaştığınız tüm içeriklerden siz
            sorumlusunuz. Kullanıcılar, paylaştıkları içeriklerin telif hakkı,
            ticari marka hakları ve diğer fikri mülkiyet haklarını ihlal
            etmediğini garanti eder.
          </p>
          <p>Aşağıdaki türde içeriklerin paylaşılması kesinlikle yasaktır:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Pornografik veya müstehcen içerik</li>
            <li>Nefret söylemi veya ayrımcılık içeren içerik</li>
            <li>Şiddeti veya yasa dışı faaliyetleri teşvik eden içerik</li>
            <li>Taciz veya zorbalık içeren içerik</li>
            <li>Kişisel veya gizli bilgileri ifşa eden içerik</li>
            <li>Telif hakkı korumalı materyallerin izinsiz kullanımı</li>
          </ul>
          <p>
            IyiLink, yukarıdaki kurallara uymayan içerikleri kaldırma ve ilgili
            hesapları askıya alma hakkını saklı tutar.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            5. Ücretlendirme ve Abonelikler
          </h2>
          <p>
            IyiLink hizmetinin temel özellikleri ücretsiz olarak sunulmaktadır.
            Premium özellikler ve genişletilmiş işlevsellik için ücretli
            abonelik planları mevcuttur.
          </p>
          <p>
            Ücretli abonelik satın aldığınızda, otomatik yenileme özelliği
            varsayılan olarak etkindir. Aboneliğinizi istediğiniz zaman hesap
            ayarlarınızdan iptal edebilirsiniz.
          </p>
          <p>
            Abonelik iptalleri, mevcut fatura döneminin sonunda geçerli olur.
            Kısmi iade veya kullanılmayan süre için kredi verilmez.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            6. Gizlilik Politikası
          </h2>
          <p>
            Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu
            hakkında detaylı bilgi için lütfen Gizlilik Politikamızı
            inceleyiniz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">7. Değişiklikler</h2>
          <p>
            IyiLink, bu Kullanım Şartları'nı herhangi bir zamanda değiştirme
            hakkını saklı tutar. Değişiklikler, web sitesinde yayınlandığı
            tarihte yürürlüğe girer. Önemli değişiklikler hakkında kullanıcıları
            bilgilendirmek için makul çabalar gösterilecektir.
          </p>
          <p>
            Değişikliklerden sonra IyiLink'i kullanmaya devam etmeniz,
            güncellenmiş Kullanım Şartları'nı kabul ettiğiniz anlamına gelir.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            8. Sorumluluk Sınırlaması
          </h2>
          <p>
            IyiLink, hizmetlerin kesintisiz veya hatasız olacağını garanti
            etmez. Platform, düzenli bakım ve güncellemeler için geçici olarak
            kullanılamayabilir.
          </p>
          <p>
            IyiLink ve onun bağlı kuruluşları, hizmetin kullanımından
            kaynaklanan doğrudan, dolaylı, tesadüfi, özel, sonuç olarak ortaya
            çıkan veya cezai zararlardan sorumlu tutulamaz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">9. İletişim</h2>
          <p>
            Bu Kullanım Şartları ile ilgili sorularınız veya geri
            bildirimleriniz için, lütfen{" "}
            <a
              href="mailto:legal@iyilink.co"
              className="text-blue-600 hover:underline"
            >
              legal@iyilink.co
            </a>
            adresine e-posta gönderin.
          </p>
        </div>
      </div>

      <div
        className="bg-white shadow-md rounded-lg p-6"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <h2 className="text-xl font-semibold mb-4">Sık Sorulan Sorular</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">
              IyiLink hesabımı nasıl silebilirim?
            </h3>
            <p>
              Hesabınızı silmek için, hesap ayarlarına gidin ve "Hesabı Sil"
              seçeneğini kullanın. Hesap silme işlemi geri alınamaz ve tüm
              verileriniz kalıcı olarak silinir.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              Aboneliğimi nasıl iptal edebilirim?
            </h3>
            <p>
              Aboneliğinizi iptal etmek için, hesap ayarlarına gidin,
              "Abonelikler" bölümünü seçin ve "Aboneliği İptal Et" butonuna
              tıklayın. Aboneliğiniz mevcut fatura döneminin sonunda sona
              erecektir.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">İçeriğimi kim görebilir?</h3>
            <p>
              Profilinizin ve içeriğinizin görünürlüğünü hesap ayarlarınızdan
              kontrol edebilirsiniz. Profilinizi herkese açık, sadece
              bağlantılarınıza açık veya tamamen özel olarak ayarlayabilirsiniz.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              Şifre veya hesap sorunları yaşıyorum. Ne yapmalıyım?
            </h3>
            <p>
              Şifrenizi unuttuysanız, giriş sayfasındaki "Şifremi Unuttum"
              seçeneğini kullanabilirsiniz. Diğer hesap sorunları için lütfen{" "}
              <a
                href="mailto:support@iyilink.co"
                className="text-blue-600 hover:underline"
              >
                support@iyilink.co
              </a>{" "}
              adresine e-posta gönderin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
