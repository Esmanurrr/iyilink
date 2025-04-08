import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <header
      className="shadow-md"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold"
            style={{ color: "var(--color-white)" }}
          >
            İyilink
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {currentUser ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="hover:underline transition-all"
                      style={{ color: "var(--color-white)" }}
                    >
                      Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:underline transition-all"
                      style={{ color: "var(--color-white)" }}
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
                      className="hover:underline transition-all"
                      style={{ color: "var(--color-white)" }}
                    >
                      Giriş Yap
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="px-4 py-2 rounded-md transition-all"
                      style={{
                        backgroundColor: "var(--color-white)",
                        color: "var(--color-primary)",
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
