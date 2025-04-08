import { Link } from "react-router-dom";

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
                İyiLink
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
                <li>
                  <Link
                    to="/help"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    Yardım
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
                <li>
                  <Link
                    to="/terms"
                    className="hover:underline transition-all hover:text-primary"
                    style={{ color: "var(--color-link)" }}
                  >
                    Kullanım Şartları
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6" style={{ borderColor: "var(--color-border)" }} />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span
            className="text-sm sm:text-center"
            style={{ color: "var(--color-light-text)" }}
          >
            © {currentYear}{" "}
            <Link
              to="/"
              className="hover:underline"
              style={{ color: "var(--color-link)" }}
            >
              İyiLink
            </Link>
            . Tüm hakları saklıdır.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="hover:opacity-80 transition-all"
              style={{ color: "var(--color-primary)" }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-all"
              style={{ color: "var(--color-primary)" }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-all"
              style={{ color: "var(--color-primary)" }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.06V6.94l6.88 5.06-6.88 5.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
