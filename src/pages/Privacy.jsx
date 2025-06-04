import React from "react";

const Privacy = () => {
  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ color: "var(--color-dark-text)" }}
    >
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "var(--color-primary)" }}
      >
        Gizlilik Politikası
      </h1>

      <div
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <p className="mb-6">Son güncelleme: 01.07.2023</p>

        <div className="prose max-w-none">
          <p>
            IyiLink olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi
            korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, hizmetlerimizi
            kullanırken topladığımız bilgileri ve bu bilgileri nasıl
            kullandığımızı açıklamaktadır.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            1. Topladığımız Bilgiler
          </h2>
          <p>
            Hizmetlerimizi kullanırken aşağıdaki kişisel verileri
            toplayabiliriz:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Hesap Bilgileri:</strong> Adınız, e-posta adresiniz,
              kullanıcı adınız ve şifreniz gibi kayıt sırasında sağladığınız
              bilgiler.
            </li>
            <li>
              <strong>Profil Bilgileri:</strong> Biyografiniz, profil resminiz,
              sosyal medya bağlantılarınız ve diğer paylaşmayı tercih ettiğiniz
              kişisel bilgiler.
            </li>
            <li>
              <strong>Kullanım Verileri:</strong> Platformumuzu nasıl
              kullandığınıza dair bilgiler, ziyaret ettiğiniz sayfalar,
              tıkladığınız linkler ve diğer etkileşimler.
            </li>
            <li>
              <strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü,
              işletim sistemi ve cihaz tanımlayıcıları gibi teknik bilgiler.
            </li>
            <li>
              <strong>Çerezler ve İzleme Teknolojileri:</strong> Deneyiminizi
              kişiselleştirmek ve hizmetlerimizi geliştirmek için çerezler ve
              benzer teknolojiler kullanıyoruz.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            2. Bilgileri Kullanma Amacımız
          </h2>
          <p>Topladığımız bilgileri aşağıdaki amaçlar için kullanıyoruz:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Hesabınızı oluşturmak ve yönetmek</li>
            <li>Size hizmetlerimizi sağlamak ve iyileştirmek</li>
            <li>Destek taleplerini yanıtlamak ve müşteri hizmetleri sunmak</li>
            <li>Güvenlik sorunlarını tespit etmek ve önlemek</li>
            <li>Size önemli bildirimler ve güncellemeler göndermek</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            <li>
              Tercihlerinize bağlı olarak, size ilgili pazarlama iletileri
              göndermek
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            3. Bilgi Paylaşımı
          </h2>
          <p>
            Kişisel verilerinizi aşağıdaki durumlarda üçüncü taraflarla
            paylaşabiliriz:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Hizmet Sağlayıcılar:</strong> Hizmetlerimizi sunmamıza
              yardımcı olan güvenilir üçüncü taraf hizmet sağlayıcılarla
              (örneğin, barındırma, analiz, ödeme işleme) çalışıyoruz.
            </li>
            <li>
              <strong>Yasal Gereklilikler:</strong> Yasal bir yükümlülüğe uymak,
              yasal bir süreci yerine getirmek veya yasal haklarımızı korumak
              için gerekli olduğunda bilgileri açıklayabiliriz.
            </li>
            <li>
              <strong>İş Transferleri:</strong> Şirket birleşmesi, satın
              alınması veya varlıklarımızın satışı durumunda, kişisel
              verileriniz aktarılan varlıklar arasında olabilir.
            </li>
            <li>
              <strong>İzninizle:</strong> Açık izninizi aldığımız diğer
              durumlarda.
            </li>
          </ul>
          <p>
            Kişisel verilerinizi pazarlama amaçlı olarak üçüncü taraflara
            satmıyor veya kiralamıyoruz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            4. Çerezler ve İzleme Teknolojileri
          </h2>
          <p>
            Web sitemizde ve hizmetlerimizde çerezler ve benzer izleme
            teknolojileri kullanıyoruz. Bunlar, tercihlerinizi hatırlamak,
            deneyiminizi kişiselleştirmek ve hizmetlerimizi geliştirmemize
            yardımcı olmak için kullanılır.
          </p>
          <p>
            Çerezler hakkında daha fazla bilgi ve çerez tercihlerinizi nasıl
            yönetebileceğiniz için lütfen Çerez Politikamızı ziyaret edin.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Veri Güvenliği</h2>
          <p>
            Kişisel verilerinizi korumak için uygun teknik ve organizasyonel
            önlemleri alıyoruz. Ancak, internet üzerinden hiçbir veri iletiminin
            veya depolama sisteminin %100 güvenli olmadığını unutmayın.
          </p>
          <p>
            Hesap güvenliğinizi artırmak için güçlü şifreler kullanmanızı ve
            şifrenizi başkalarıyla paylaşmamanızı öneririz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">6. Veri Saklama</h2>
          <p>
            Kişisel verilerinizi yalnızca hizmetlerimizi sağlamak için gerekli
            olduğu sürece veya yasal yükümlülüklerimizi yerine getirmek için
            gerekli olan süre boyunca saklarız. Saklama süreleri, veri türüne ve
            kullanım amacına bağlı olarak değişebilir.
          </p>
          <p>
            Hesabınızı sildiğinizde, kişisel verilerinizi makul bir süre içinde
            sistemlerimizden kaldırırız, ancak yasal yükümlülüklerimiz nedeniyle
            bazı bilgileri daha uzun süre saklamamız gerekebilir.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            7. Kullanıcı Hakları
          </h2>
          <p>
            Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Kişisel verilerinize erişme ve onların bir kopyasını alma hakkı
            </li>
            <li>
              Yanlış veya eksik kişisel verilerin düzeltilmesini isteme hakkı
            </li>
            <li>
              Belirli koşullar altında kişisel verilerinizin silinmesini isteme
              hakkı
            </li>
            <li>
              Belirli koşullar altında kişisel verilerinizin işlenmesini
              kısıtlama hakkı
            </li>
            <li>Kişisel verilerinizin işlenmesine itiraz etme hakkı</li>
            <li>Veri taşınabilirliği hakkı</li>
            <li>
              Verilerinizin otomatik işlenmesine dayalı kararlardan etkilenmeme
              hakkı
            </li>
          </ul>
          <p>
            Bu haklarınızı kullanmak için lütfen aşağıdaki iletişim bilgilerini
            kullanarak bizimle iletişime geçin.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            8. Çocukların Gizliliği
          </h2>
          <p>
            Hizmetlerimiz, 13 yaşın altındaki çocuklara yönelik değildir. 13
            yaşın altındaki çocuklardan bilerek kişisel veri toplamıyoruz. 13
            yaşın altındaki bir çocuğun kişisel bilgilerini topladığımızı
            düşünüyorsanız, lütfen bizimle iletişime geçin ve bu bilgileri
            sistemlerimizden hemen kaldıracağız.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            9. Uluslararası Veri Transferleri
          </h2>
          <p>
            Hizmetlerimizi sağlamak için, kişisel verileriniz Türkiye dışındaki
            ülkelere aktarılabilir ve bu ülkelerde işlenebilir. Bu durumlarda,
            verilerinizin uygun düzeyde korunmasını sağlamak için gerekli
            önlemleri alıyoruz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            10. Politika Değişiklikleri
          </h2>
          <p>
            Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Herhangi
            bir değişiklik yaptığımızda, güncellenmiş politikayı web sitemizde
            yayınlayacağız ve son güncelleme tarihini değiştireceğiz.
          </p>
          <p>
            Önemli değişiklikler durumunda, size e-posta bildirimi göndererek
            veya hizmetlerimizde belirgin bir bildirim yayınlayarak sizi
            bilgilendireceğiz.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">11. İletişim</h2>
          <p>
            Bu Gizlilik Politikası hakkında herhangi bir sorunuz veya endişeniz
            varsa, lütfen bizimle iletişime geçin:
          </p>
          <address className="not-italic mt-4">
            <div className="mb-2">IyiLink</div>

            <div className="mb-2">
              Adres: Ali Kuşçu Mahallesi, Taylasan Sok. No:3, Fatih/İstanbul
            </div>
          </address>
        </div>
      </div>

      <div
        className="bg-white shadow-md rounded-lg p-6"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <h2 className="text-xl font-semibold mb-4">Veri Koruma Bildirimi</h2>

        <div className="space-y-4">
          <p>
            Gizlilik ve veri koruma uygulamalarımız hakkında daha fazla bilgi
            için, lütfen Gizlilik Politikamızın tamamını dikkatlice okuyun.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
