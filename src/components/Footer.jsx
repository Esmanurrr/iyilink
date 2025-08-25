import { Link } from "react-router-dom";
import instagram from "/instagram.svg";
import facebook from "/facebook.svg";
import twitter from "/twitter.svg";
import iyilink from "/iyilink.svg";
import ihhLogo from "/ihh-logo.svg";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0f2728",
        borderTop: "1px solid var(--color-border)",
        boxShadow: "0 -2px 8px var(--color-shadow)",
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          <div className="flex justify-center md:justify-start items-center space-x-4">
            <Link>
              <img src={twitter} alt="Twitter Logo" className="w-8 h-8" />
            </Link>
            <Link>
              <img src={facebook} alt="Facebook Logo" className="w-8 h-8" />
            </Link>
            <Link>
              <img src={instagram} alt="Instagram Logo" className="w-8 h-8" />
            </Link>
          </div>

          <div className="flex justify-center items-center transition-all hover:opacity-90">
            <img src={iyilink} alt="Iyilink Logo" className="h-10" />
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-baloo text-sm md:text-base leading-tight">
              İYİLİĞİN LİNKLERİ <br />
              <span style={{ color: "var(--color-primary)" }}>İYİLİNK'TE</span>
            </h3>
          </div>
        </div>
      </div>

      <hr className="w-full" style={{ borderColor: "var(--color-border)" }} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
          <span
            className="text-sm font-baloo font-thin text-center md:text-left"
            style={{ color: "var(--color-white-bg)" }}
          >
            © 2025 Genç İHH Akademi ve Teknoloji Organizasyon Merkezi
          </span>

          <div className="flex justify-center">
            <img src={ihhLogo} alt="İhh Logo" className="h-8" />
          </div>

          <div
            className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4 font-baloo font-thin text-sm text-center md:text-right"
            style={{ color: "var(--color-white-bg)" }}
          >
            <Link to="/terms" className="hover:underline">
              Kullanım Şartları
            </Link>
            <span className="md:inline">|</span>
            <Link to="/faq" className="hover:underline">
              Sıkça Sorulan Sorular
            </Link>
            <span className="md:inline">|</span>
            <Link to="/privacy" className="hover:underline">
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
