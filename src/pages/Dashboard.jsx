import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import LinksManager from "../components/links/LinksManager";
import ProfilePreview from "../components/ProfilePreview";
import { useSelector } from "react-redux";

// Links Management Component

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { profile } = useSelector((state) => state.user);

  if (!currentUser) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div
          className="text-center p-8 rounded-lg shadow-md"
          style={{
            backgroundColor: "var(--color-card-bg)",
            boxShadow: "0 4px 6px var(--color-shadow)",
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-dark-text)" }}
          >
            Erişim Reddedildi
          </h2>
          <p className="mb-6" style={{ color: "var(--color-light-text)" }}>
            Bu sayfayı görüntülemek için giriş yapmalısınız.
          </p>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "github":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        );
      case "globe":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
    }
  };

  // Kullanıcının username'i varsa göster, yoksa email'den oluştur
  const getUsernameFromProfile = () => {
    if (profile?.username) {
      return profile.username;
    } else if (currentUser?.email) {
      return currentUser.email.split("@")[0].toLowerCase();
    } else {
      return currentUser?.uid?.substring(0, 8) || "user";
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Profile Section */}
        <div
          className="rounded-xl p-6 mb-8"
          style={{
            backgroundColor: "var(--color-card-bg)",
            borderColor: "var(--color-border)",
            boxShadow: "0 4px 12px var(--color-shadow)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1
                className="text-2xl font-bold mb-1"
                style={{ color: "var(--color-dark-text)" }}
              >
                {currentUser.email}
              </h1>
              <div className="flex items-center">
                <p style={{ color: "var(--color-light-text)" }}>
                  iyilink.co/{getUsernameFromProfile()}
                </p>
                <button
                  className="ml-2 text-sm p-1 rounded-md"
                  style={{
                    backgroundColor: "var(--color-neutral-light)",
                    color: "var(--color-dark-text)",
                  }}
                  onClick={() => {
                    const profileUrl = `${
                      window.location.origin
                    }/${getUsernameFromProfile()}`;
                    navigator.clipboard.writeText(profileUrl);
                    // İsteğe bağlı: kopyalandığına dair bir bildirim gösterilebilir
                  }}
                  title="Linki kopyala"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <Link
              to="/profile/edit"
              className="px-4 py-2 rounded-lg transition-colors flex items-center"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
                boxShadow: "0 2px 4px var(--color-shadow)",
              }}
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Profili Düzenle
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: "var(--color-accent)",
                boxShadow: "0 2px 4px var(--color-shadow)",
              }}
            >
              <h3
                className="font-medium mb-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Toplam Görüntülenme
              </h3>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-dark-text)" }}
              >
                316
              </p>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: "var(--color-accent)",
                boxShadow: "0 2px 4px var(--color-shadow)",
              }}
            >
              <h3
                className="font-medium mb-2"
                style={{ color: "var(--color-dark-text)" }}
              >
                Bu Ay
              </h3>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-dark-text)" }}
              >
                87
              </p>
            </div>
          </div>
        </div>

        {/* Links and Preview Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Links Section - 7 columns wide on large screens */}
          <div className="lg:col-span-7">
            <LinksManager getIconComponent={getIconComponent} />
          </div>

          {/* Preview Section - 5 columns wide on large screens */}
          <div className="lg:col-span-5">
            <ProfilePreview getIconComponent={getIconComponent} />
          </div>
        </div>
      </div>
    </div>
  );
}
