import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLinks,
  createLink,
  deleteLinkById,
  updateLinkById,
  setIsAddingLink,
  updateNewLinkField,
  setError,
  startEditingLink,
  stopEditingLink,
  updateEditingLinkField,
} from "../../redux/slices/linksSlice";

import LinkList from "./LinkList";
import LinkForm from "./LinkForm";

const LinksManager = ({ getIconComponent }) => {
  const dispatch = useDispatch();
  const {
    links,
    loading,
    isAddingLink,
    newLink,
    error,
    isEditingLink,
    editingLink,
    editingLinkId,
  } = useSelector((state) => state.links);
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    if (profile?.uid) {
      console.log("Fetching links for user:", profile.uid);
      dispatch(fetchLinks(profile.uid));
    }
  }, [dispatch, profile]);

  // Bağlantı ekleme
  const handleAddLink = async (e) => {
    e.preventDefault();

    if (!profile?.uid) {
      dispatch(setError("Kullanıcı girişi yapılmamış. Lütfen giriş yapın."));
      return;
    }

    if (!newLink.title || !newLink.url) {
      dispatch(setError("Başlık ve URL alanları zorunludur."));
      return;
    }

    try {
      const linkData = {
        title: newLink.title,
        url: newLink.url,
        icon: newLink.icon,
      };

      console.log("Creating link for user:", profile.uid, linkData);
      await dispatch(createLink({ userId: profile.uid, linkData })).unwrap();
    } catch (error) {
      console.error("Link ekleme hatası:", error);
    }
  };

  // Bağlantı düzenleme modunu başlat
  const handleEditLink = (linkId) => {
    dispatch(startEditingLink(linkId));
  };

  // Bağlantı güncelleme
  const handleUpdateLink = async (e) => {
    e.preventDefault();

    if (!profile?.uid || !editingLinkId) {
      dispatch(
        setError(
          "Kullanıcı girişi yapılmamış veya düzenlenecek bağlantı bulunamadı."
        )
      );
      return;
    }

    if (!editingLink.title || !editingLink.url) {
      dispatch(setError("Başlık ve URL alanları zorunludur."));
      return;
    }

    try {
      const linkData = {
        title: editingLink.title,
        url: editingLink.url,
        icon: editingLink.icon || "link",
      };

      console.log(
        "Updating link:",
        editingLinkId,
        "for user:",
        profile.uid,
        linkData
      );
      await dispatch(
        updateLinkById({
          userId: profile.uid,
          linkId: editingLinkId,
          linkData,
        })
      ).unwrap();
    } catch (error) {
      console.error("Link güncelleme hatası:", error);
    }
  };

  // Düzenleme iptal
  const handleCancelEdit = () => {
    dispatch(stopEditingLink());
  };

  // Bağlantı silme
  const handleDeleteLink = async (linkId) => {
    if (!profile?.uid) {
      dispatch(setError("Kullanıcı girişi yapılmamış. Lütfen giriş yapın."));
      return;
    }

    try {
      console.log("Deleting link:", linkId, "for user:", profile.uid);
      await dispatch(deleteLinkById({ userId: profile.uid, linkId })).unwrap();
    } catch (error) {
      console.error("Link silme hatası:", error);
    }
  };

  // Form alanı değişikliği (ekleme veya düzenleme)
  const handleFieldChange = (field, value) => {
    if (isEditingLink) {
      dispatch(updateEditingLinkField({ field, value }));
    } else {
      dispatch(updateNewLinkField({ field, value }));
    }
  };

  // Bağlantı ekleme modunu başlat
  const handleStartAddingLink = () => {
    dispatch(setIsAddingLink(true));
  };

  // Bağlantı ekleme iptal
  const handleCancelAddLink = () => {
    dispatch(setIsAddingLink(false));
  };

  return (
    <div
      className="rounded-xl p-6 h-full"
      style={{
        backgroundColor: "var(--color-card-bg)",
        boxShadow: "0 4px 12px var(--color-shadow)",
        borderColor: "var(--color-border)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-dark-text)" }}
        >
          {isEditingLink ? "Bağlantıyı Düzenle" : "Bağlantılarım"}
        </h2>
        {!isEditingLink && (
          <button
            onClick={handleStartAddingLink}
            className="px-4 py-2 rounded-lg transition-colors flex items-center"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              boxShadow: "0 2px 4px var(--color-shadow)",
            }}
            disabled={!profile?.uid || isEditingLink}
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Bağlantı Ekle
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-danger)" }}
        >
          {error}
        </div>
      )}

      {/* Add Link Form */}
      {isAddingLink && !isEditingLink && (
        <LinkForm
          type="add"
          formData={newLink}
          loading={loading}
          onSubmit={handleAddLink}
          onCancel={handleCancelAddLink}
          onChange={handleFieldChange}
        />
      )}

      {/* Edit Link Form */}
      {isEditingLink && editingLink && (
        <LinkForm
          type="edit"
          formData={editingLink}
          loading={loading}
          onSubmit={handleUpdateLink}
          onCancel={handleCancelEdit}
          onChange={handleFieldChange}
        />
      )}

      {/* Links List */}
      {!isEditingLink && (
        <LinkList
          links={links}
          loading={loading}
          isEditingLink={isEditingLink}
          profile={profile}
          onEdit={handleEditLink}
          onDelete={handleDeleteLink}
          onAdd={handleStartAddingLink}
          getIconComponent={getIconComponent}
        />
      )}
    </div>
  );
};

export default LinksManager;
