import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPublicProfile,
  fetchProfileByUsername,
} from "../redux/slices/userSlice";
import { clearLinks, fetchLinksByUserId } from "../redux/slices/linksSlice";

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

  // Mount takibi
  useEffect(() => {
    console.log("🟢 PUBLIC PROFILE MOUNT OLDU - " + new Date().toISOString());

    return () => {
      console.log(
        "🔴 PUBLIC PROFILE UNMOUNT OLDU - " + new Date().toISOString()
      );
    };
  }, []);

  // Redux state'lerinden veri çek
  const {
    loading: userLoading,
    error: userError,
    publicProfile,
  } = useSelector((state) => state.user);

  const { loading: linksLoading, publicLinks } = useSelector(
    (state) => state.links
  );

  // Kullanıcı profilini getir (sadece username değiştiğinde)
  useEffect(() => {
    if (username) {
      console.log(`[PublicProfile] ${username} için profil getiriliyor...`);
      dispatch(fetchProfileByUsername(username));
    }

    // Cleanup
    return () => {
      dispatch(clearPublicProfile());
    };
  }, [username, dispatch]);

  // Kullanıcı profili gelince, linkleri getir
  useEffect(() => {
    if (publicProfile?.id) {
      console.log(
        `[PublicProfile] ${publicProfile.id} ID'li kullanıcının linkleri getiriliyor...`
      );
      dispatch(fetchLinksByUserId(publicProfile.id));
    }

    // Cleanup
    return () => {
      dispatch(clearLinks());
    };
  }, [publicProfile, dispatch]);

  // Link tıklaması için handler
  const handleLinkClick = async (linkId, url) => {
    // Önce linki aç - kullanıcı deneyimi için önemli
    window.open(url, "_blank", "noopener,noreferrer");

    // Sonra tıklama sayısını artırmayı dene (sessizce)
    if (publicProfile?.id) {
      try {
        const linkRef = doc(db, "users", publicProfile.id, "links", linkId);
        await updateDoc(linkRef, {
          clicks: increment(1),
        });
      } catch {
        // Sessizce hataları yok say - kullanıcı deneyimini etkilemez
      }
    }
  };

  // Genel loading durumu
  const isLoading = userLoading || linksLoading;

  // Kullanıcı bilgileri
  const displayName =
    publicProfile?.displayName ||
    publicProfile?.username ||
    "İsimsiz Kullanıcı";
  const firstLetter = (displayName || "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-[color:var(--color-background)] relative z-10">
      <div className="max-w-lg w-full bg-[color:var(--color-card-bg)] rounded-xl shadow-lg p-6 md:p-8 border border-[color:var(--color-border)]">
        {/* Yükleme durumu */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-transparent border-[color:var(--color-primary)] animate-spin"></div>
          </div>
        )}

        {/* Hata durumu */}
        {userError && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
            <p className="font-bold">Hata</p>
            <p>{userError}</p>
          </div>
        )}

        {/* Profil bilgileri */}
        {!isLoading && publicProfile && (
          <>
            <div className="text-center mb-8 bg-[color:var(--color-highlight)] p-6 rounded-lg border border-[color:var(--color-border)]">
              {publicProfile.photoURL ? (
                <img
                  src={publicProfile.photoURL}
                  alt={displayName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-[color:var(--color-primary)]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold bg-[color:var(--color-primary)]">
                  {firstLetter}
                </div>
              )}
              <h1 className="text-xl font-bold mb-2 text-[color:var(--color-dark-text)]">
                {displayName}
              </h1>
              {publicProfile.bio && (
                <p className="mb-3 text-[color:var(--color-light-text)]">
                  {publicProfile.bio}
                </p>
              )}
              <p className="text-sm text-[color:var(--color-light-text)]">
                @{publicProfile.username}
              </p>
            </div>

            {/* Linkler */}
            <div className="mt-6">
              {!publicLinks || publicLinks.length === 0 ? (
                <div className="p-6 text-center bg-[color:var(--color-highlight)] text-[color:var(--color-light-text)] rounded-lg">
                  Henüz link eklenmemiş.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {publicLinks.map((link) => (
                    <div
                      key={link.id}
                      onClick={() => handleLinkClick(link.id, link.url)}
                      className="p-3 md:p-4 bg-white rounded-lg border border-[color:var(--color-border)] shadow flex items-center cursor-pointer hover:opacity-90 transition-opacity text-[color:var(--color-dark-text)]"
                    >
                      <span className="mr-3 text-[color:var(--color-primary)]">
                        <LinkIcon />
                      </span>
                      <div>
                        <h3 className="font-medium">
                          {link.title || "İsimsiz Link"}
                        </h3>
                        {link.description && (
                          <p className="text-sm mt-1 text-[color:var(--color-light-text)]">
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
            <div className="mt-8 text-xs text-center text-[color:var(--color-light-text)]">
              <p>
                {publicProfile.username}'in profil sayfası • IyiLink ile
                oluşturuldu
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
