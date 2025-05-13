import { Link } from "react-router-dom";
import logo from "/koyu-renk-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-neutral-light)",
        borderTop: "1px solid var(--color-border)",
        boxShadow: "0 -2px 8px var(--color-shadow)",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span
                className="self-center text-2xl font-semibold transition-all hover:opacity-90"
                style={{ color: "var(--color-primary)" }}
              >
                <img src={logo} alt="İyilink Logo" className="w-24 h-full" />
              </span>
            </Link>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--color-light-text)" }}
            >
              Tüm bağlantılarınız için tek link
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <h2
                className="mb-4 text-sm font-semibold uppercase"
                style={{ color: "var(--color-dark-text)" }}
              >
                Kaynaklar
              </h2>
              <ul style={{ color: "var(--color-light-text)" }}>
                <li className="mb-2">
                  <Link
                    to="/about"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/faq"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    Sık Sorulan Sorular
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2
                className="mb-4 text-sm font-semibold uppercase"
                style={{ color: "var(--color-dark-text)" }}
              >
                İletişim
              </h2>
              <ul style={{ color: "var(--color-light-text)" }}>
                <li className="mb-2">
                  <Link
                    to="/contact"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    İletişim
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/terms"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    Kullanım Şartları
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6" style={{ borderColor: "var(--color-border)" }} />

        <div className="text-center">
          <span
            className="text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            © {currentYear}{" "}
            <Link
              to="/"
              className="hover:underline"
              style={{ color: "var(--color-link)" }}
            >
              İyilink
            </Link>
            . Tüm hakları saklıdır.
          </span>
        </div>
      </div>
    </footer>
  );
}
