import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileByUsername } from "../redux/slices/userSlice";
import {
  fetchPublicLinksByUsername,
  incrementLinkClicks,
} from "../redux/slices/linksSlice";

const PublicProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  // Redux store'dan verileri çek
  const {
    publicProfile,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    publicLinks,
    loading: linksLoading,
    error: linksError,
  } = useSelector((state) => state.links);

  // Yükleme ve hata durumlarını birleştir
  const loading = userLoading || linksLoading;
  const error = userError || linksError;

  useEffect(() => {
    if (username) {
      // Önce kullanıcı profilini getir
      dispatch(fetchProfileByUsername(username))
        .unwrap()
        .then(() => {
          // Profil başarıyla alındıktan sonra linkleri getir
          dispatch(fetchPublicLinksByUsername(username));
        })
        .catch((error) => {
          console.error("Profil veya link getirme hatası:", error);
        });
    }
  }, [username, dispatch]);

  const handleLinkClick = (linkId) => {
    // Redux thunk ile tıklama sayısını artır
    dispatch(incrementLinkClicks(linkId));

    // Kullanıcı için anında geri bildirim (isteğe bağlı, Redux state güncellenecek zaten)
    const clickCountEl = document.querySelector(
      `[data-link-id="${linkId}"] .click-count`
    );
    if (clickCountEl) {
      const currentClicks = parseInt(
        clickCountEl.getAttribute("data-clicks") || "0",
        10
      );
      clickCountEl.setAttribute("data-clicks", currentClicks + 1);
      clickCountEl.textContent = currentClicks + 1;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: "var(--color-primary)" }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!publicProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold mb-4">Kullanıcı Bulunamadı</h1>
          <p>Bu kullanıcı adına sahip bir profil bulunamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-md mx-auto">
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
            {publicProfile.email?.charAt(0).toUpperCase() ||
              publicProfile.displayName?.charAt(0).toUpperCase() ||
              "?"}
          </div>
          <h3
            className="text-lg font-medium mb-1"
            style={{ color: "var(--color-dark-text)" }}
          >
            {publicProfile.displayName ||
              publicProfile.username ||
              "İsimsiz Kullanıcı"}
          </h3>
          <p
            className="mb-6 text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            {publicProfile.bio ||
              "Sosyal medya hesaplarım ve kişisel linklerim"}
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            {publicLinks?.length === 0 ? (
              <p
                className="text-center py-4"
                style={{ color: "var(--color-light-text)" }}
              >
                Bu kullanıcı henüz link eklememiş.
              </p>
            ) : (
              publicLinks?.map((link) => (
                <a
                  key={link.id}
                  data-link-id={link.id}
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                    window.open(link.url, "_blank", "noopener,noreferrer");
                  }}
                >
                  <span className="font-medium">{link.title}</span>
                  {link.clicks > 0 && (
                    <span
                      className="ml-auto text-xs opacity-60 click-count"
                      title="Tıklama sayısı"
                      data-clicks={link.clicks}
                    >
                      {link.clicks}
                    </span>
                  )}
                </a>
              ))
            )}
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: "var(--color-light-text)" }}>
            Powered by IYILINK
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
