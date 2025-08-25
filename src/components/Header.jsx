import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger menü için ikonlar
import iyilinkLogo from "/iyilink-logo.svg";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header
      className="shadow-md sticky top-0 z-50"
      style={{
        boxShadow: "0 2px 8px rgba(200, 230, 210, 0.4)",
        backgroundColor: "white",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={iyilinkLogo} alt="İyilink Logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link
              to="/"
              className=" transition-colors duration-300"
              style={{ color: "var(--color-dark-text)" }}
            >
              Anasayfa
            </Link>
            <Link
              to="/about"
              className=" transition-colors duration-300"
              style={{ color: "var(--color-dark-text)" }}
            >
              Hakkımızda
            </Link>
            <Link
              to="/contact"
              className=" transition-colors duration-300"
              style={{ color: "var(--color-dark-text)" }}
            >
              İletişim
            </Link>
          </nav>

          {/* Desktop Auth Butonları */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="transition-colors duration-300"
                  style={{ color: "var(--color-dark-text)" }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-3xl transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-primary-light)",
                    color: "#fff",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="transition-colors duration-300 font-semibold"
                  style={{ color: "var(--color-dark-text)" }}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 font-semibold rounded-3xl transition-all duration-300 hover:bg-opacity-90"
                  style={{
                    backgroundColor: "var(--color-primary-light)",
                    color: "#fff",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobil Menü Butonu */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col items-center gap-4 bg-[#0f2728] rounded-lg py-4 shadow-lg">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-400 transition-colors duration-300"
              style={{ color: "#ECFFE6" }}
            >
              Anasayfa
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-400 transition-colors duration-300"
              style={{ color: "#ECFFE6" }}
            >
              Hakkımızda
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-green-400 transition-colors duration-300"
              style={{ color: "#ECFFE6" }}
            >
              İletişim
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-green-400 transition-colors duration-300"
                  style={{ color: "#ECFFE6" }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-6 py-2 rounded-3xl transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-primary-light)",
                    color: "#fff",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-green-400 transition-colors duration-300"
                  style={{ color: "#ECFFE6" }}
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-3xl transition-all duration-300 hover:bg-opacity-90"
                  style={{
                    backgroundColor: "var(--color-primary-light)",
                    color: "#fff",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
