import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "/acik-renk-logo.png";
export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header
      className="shadow-md"
      style={{
        backgroundColor: "#3E7B27",
        boxShadow: "0 2px 8px rgba(200, 230, 210, 0.4)",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold transition-all duration-300 hover:opacity-80"
            style={{ color: "#ECFFE6" }}
          >
            <img src={logo} alt="logo" className="w-24 h-full" />
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {currentUser ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:opacity-80 transition-all duration-300"
                      style={{ color: "#ECFFE6" }}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:opacity-80 transition-all duration-300"
                      style={{ color: "#ECFFE6" }}
                    >
                      Çıkış Yap
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="hover:opacity-80 transition-all duration-300"
                      style={{ color: "#e7f5e2" }}
                    >
                      Giriş Yap
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="px-4 py-2 rounded-md transition-all duration-300 hover:bg-opacity-90"
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#34a853",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Kayıt Ol
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
