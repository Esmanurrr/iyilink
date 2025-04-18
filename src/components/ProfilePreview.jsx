import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePreview = ({ getIconComponent }) => {
  // Redux store'dan verileri al
  const { profile } = useSelector((state) => state.user);
  const { links } = useSelector((state) => state.links);

  // Kullanıcı henüz giriş yapmamışsa veya profil yoksa
  if (!profile) {
    return (
      <div
        className="rounded-xl p-6 sticky top-4 h-full"
        style={{
          backgroundColor: "var(--color-card-bg)",
          boxShadow: "0 4px 12px var(--color-shadow)",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-6"
          style={{ color: "var(--color-dark-text)" }}
        >
          Profil Önizleme
        </h2>
        <div className="text-center p-6">
          <p style={{ color: "var(--color-light-text)" }}>
            Profil bilgileri yüklenemedi.
          </p>
        </div>
      </div>
    );
  }

  // Kullanıcı adını belirle
  const username =
    profile.username || profile.email?.split("@")[0]?.toLowerCase() || "";

  // DEĞIŞIKLIK: displayName yerine username'i göster, "@" ile ön ek ekle
  const displayText = `@${username}`;

  // Profil resmi için ilk harf - username'in ilk harfini kullanalım
  const firstLetter = (username || "?").charAt(0).toUpperCase();

  // Tam profil URL'si
  const profileUrl = `${window.location.origin}/${username}`;

  return (
    <div
      className="rounded-xl p-6 sticky top-4 h-full"
      style={{
        backgroundColor: "var(--color-card-bg)",
        boxShadow: "0 4px 12px var(--color-shadow)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-dark-text)" }}
        >
          Profil Önizleme
        </h2>
        <Link
          to={`/${username}`}
          target="_blank"
          className="text-sm px-2 py-1 rounded"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-dark-text)",
          }}
          title="Profili yeni sekmede aç"
        >
          Canlı Görünüm
        </Link>
      </div>

      {/* URL gösterimi */}
      <div
        className="mb-4 p-2 flex items-center justify-between rounded text-sm"
        style={{
          backgroundColor: "var(--color-highlight)",
          border: "1px solid var(--color-border)",
        }}
      >
        <span style={{ color: "var(--color-light-text)" }}>{profileUrl}</span>
        <button
          className="ml-2 p-1 rounded-md"
          style={{
            backgroundColor: "var(--color-neutral-light)",
            color: "var(--color-dark-text)",
          }}
          onClick={() => {
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

      {/* Profil Önizleme Kartı */}
      <div
        className="border rounded-lg p-8 text-center"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-highlight)",
          boxShadow: "0 2px 4px var(--color-shadow)",
        }}
      >
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {firstLetter}
        </div>
        <h3
          className="text-lg font-medium mb-1"
          style={{ color: "var(--color-dark-text)" }}
        >
          {displayText}
        </h3>
        <p
          className="mb-6 text-sm"
          style={{ color: "var(--color-light-text)" }}
        >
          {profile.bio || "Sosyal medya hesaplarım ve kişisel linklerim"}
        </p>

        <div className="space-y-3 max-w-sm mx-auto">
          {links && links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 px-3 rounded-lg transition-colors flex items-center justify-center hover:opacity-90"
                style={{
                  backgroundColor: "white",
                  color: "var(--color-dark-text)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 4px var(--color-shadow)",
                }}
              >
                <span
                  className="mr-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {getIconComponent(link.icon)}
                </span>
                {link.title}
                {link.clicks > 0 && (
                  <span
                    className="ml-auto text-xs opacity-60"
                    title="Tıklama sayısı"
                  >
                    {link.clicks}
                  </span>
                )}
              </a>
            ))
          ) : (
            <p
              className="text-center py-4"
              style={{ color: "var(--color-light-text)" }}
            >
              Henüz link eklenmemiş.
            </p>
          )}
        </div>
      </div>

      {/* Not */}
      <div
        className="mt-4 text-xs text-center"
        style={{ color: "var(--color-light-text)" }}
      >
        <p>
          Bu sadece bir önizlemedir. Gerçek profil sayfasında küçük farklılıklar
          olabilir.
        </p>
      </div>
    </div>
  );
};

export default ProfilePreview;
