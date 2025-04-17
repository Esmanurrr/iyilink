import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearPublicProfile } from "../redux/slices/userSlice";
import { clearLinks } from "../redux/slices/linksSlice";

// Link ikonu bileşeni
const LinkIcon = () => (
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
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const PublicProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  // Yerel state'ler - Redux'a güvenmeden önce direkt Firestore'dan veri çekelim
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Asenkron veri yükleme fonksiyonu
    const fetchProfileData = async () => {
      if (!username) return;

      setLoading(true);
      setError(null);

      try {
        console.log(`Profil yükleniyor: ${username}`);

        // 1. Kullanıcıyı Firestore'dan doğrudan bul
        const usersRef = collection(db, "users");
        let userQuery = query(usersRef, where("username", "==", username));
        let userSnapshot = await getDocs(userQuery);

        // Büyük-küçük harf duyarlılığı için ikinci kontrol
        if (userSnapshot.empty) {
          userQuery = query(
            usersRef,
            where("username", "==", username.toLowerCase())
          );
          userSnapshot = await getDocs(userQuery);
        }

        if (userSnapshot.empty) {
          setError(
            `"${username}" kullanıcı adına sahip bir profil bulunamadı.`
          );
          setLoading(false);
          return;
        }

        // Kullanıcı profilini al
        const userDoc = userSnapshot.docs[0];
        const userData = {
          id: userDoc.id,
          ...userDoc.data(),
        };

        console.log("Kullanıcı bulundu:", userData.username);
        setProfile(userData);

        // 2. Kullanıcının linklerini getir
        const userLinksRef = collection(db, "users", userData.id, "links");
        const linksSnapshot = await getDocs(userLinksRef);

        const userLinks = linksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(`${userLinks.length} link bulundu`);
        setLinks(userLinks);

        // Redux state'lerini de güncelle (temizlik için)
        dispatch(clearPublicProfile());
        dispatch(clearLinks());
      } catch (err) {
        console.error("Profil yükleme hatası:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();

    // Cleanup
    return () => {
      dispatch(clearPublicProfile());
      dispatch(clearLinks());
    };
  }, [username, dispatch]);

  // Link tıklaması için handler
  const handleLinkClick = async (linkId, url) => {
    // Önce linki aç - kullanıcı deneyimi için önemli
    window.open(url, "_blank", "noopener,noreferrer");

    // Sonra tıklama sayısını artırmayı dene (sessizce)
    if (profile?.id) {
      try {
        const linkRef = doc(db, "users", profile.id, "links", linkId);
        await updateDoc(linkRef, {
          clicks: increment(1),
        });
      } catch {
        // Sessizce hataları yok say - kullanıcı deneyimini etkilemez
      }
    }
  };

  // Sayfa stilini tanımla
  const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    backgroundColor: "var(--color-background)",
  };

  // Yükleme durumu
  if (loading) {
    return (
      <div style={pageStyle}>
        <div
          className="flex justify-center items-center h-64 rounded-xl w-full max-w-md"
          style={{
            backgroundColor: "var(--color-card-bg)",
            boxShadow: "0 4px 12px var(--color-shadow)",
          }}
        >
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: "var(--color-primary)" }}
          ></div>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div style={pageStyle}>
        <div
          className="p-6 rounded-xl w-full max-w-md"
          style={{
            backgroundColor: "var(--color-card-bg)",
            boxShadow: "0 4px 12px var(--color-shadow)",
            border: "1px solid var(--color-error)",
          }}
        >
          <p className="font-bold mb-2" style={{ color: "var(--color-error)" }}>
            Hata
          </p>
          <p style={{ color: "var(--color-light-text)" }}>{error}</p>
        </div>
      </div>
    );
  }

  // Profil bulunamadı durumu
  if (!profile) {
    return (
      <div style={pageStyle}>
        <div
          className="p-6 rounded-xl w-full max-w-md"
          style={{
            backgroundColor: "var(--color-card-bg)",
            boxShadow: "0 4px 12px var(--color-shadow)",
            border: "1px solid var(--color-warning)",
          }}
        >
          <p
            className="font-bold mb-2"
            style={{ color: "var(--color-warning)" }}
          >
            Profil Bulunamadı
          </p>
          <p style={{ color: "var(--color-light-text)" }}>
            "{username}" kullanıcı adına sahip bir profil bulunamadı.
          </p>
        </div>
      </div>
    );
  }

  // Kullanıcı bilgileri
  const displayName =
    profile.displayName || profile.username || "İsimsiz Kullanıcı";
  const firstLetter = (displayName || "?").charAt(0).toUpperCase();

  // Ana render
  return (
    <div style={pageStyle}>
      <div
        className="rounded-xl p-8 w-full max-w-md"
        style={{
          backgroundColor: "var(--color-card-bg)",
          boxShadow: "0 4px 12px var(--color-shadow)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Profil Kartı */}
        <div
          className="text-center mb-8 p-6 rounded-lg"
          style={{
            backgroundColor: "var(--color-highlight)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 4px var(--color-shadow)",
          }}
        >
          {profile.photoURL ? (
            <img
              src={profile.photoURL}
              alt={displayName}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2"
              style={{ borderColor: "var(--color-primary)" }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {firstLetter}
            </div>
          )}

          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-dark-text)" }}
          >
            {displayName}
          </h1>

          {profile.bio && (
            <p
              className="max-w-lg mx-auto text-center mb-2"
              style={{ color: "var(--color-light-text)" }}
            >
              {profile.bio}
            </p>
          )}

          <p className="text-sm" style={{ color: "var(--color-light-text)" }}>
            @{profile.username}
          </p>
        </div>

        {/* Linkler */}
        <div className="space-y-4">
          {!links || links.length === 0 ? (
            <div
              className="p-8 text-center rounded-lg"
              style={{
                backgroundColor: "var(--color-highlight)",
                color: "var(--color-light-text)",
              }}
            >
              Henüz link eklenmemiş.
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="block py-3 px-4 rounded-lg transition-colors flex items-center hover:opacity-90 cursor-pointer"
                  onClick={() => handleLinkClick(link.id, link.url)}
                  style={{
                    backgroundColor: "white",
                    color: "var(--color-dark-text)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 2px 4px var(--color-shadow)",
                  }}
                >
                  <span
                    className="mr-3"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <LinkIcon />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {link.title || "İsimsiz Link"}
                    </h3>
                    {link.description && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: "var(--color-light-text)" }}
                      >
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alt not */}
        <div
          className="mt-8 text-xs text-center"
          style={{ color: "var(--color-light-text)" }}
        >
          <p>{profile.username}'in profil sayfası • IyiLink ile oluşturuldu</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
