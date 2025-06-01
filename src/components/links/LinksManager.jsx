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
  migrateLinksOrder,
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
      dispatch(fetchLinks(profile.uid)).then((result) => {
        if (result.type === "links/fetchLinks/fulfilled") {
          const linksWithoutOrder = result.payload.filter(
            (link) => link.order === undefined || link.order === null
          );

          if (linksWithoutOrder.length > 0) {
            dispatch(migrateLinksOrder(profile.uid));
          }
        }
      });
    }
  }, [dispatch, profile]);

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

      await dispatch(createLink({ userId: profile.uid, linkData })).unwrap();
    } catch (error) {}
  };

  const handleEditLink = (linkId) => {
    dispatch(startEditingLink(linkId));
  };

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
      await dispatch(
        updateLinkById({
          userId: profile.uid,
          linkId: editingLinkId,
          linkData,
        })
      ).unwrap();
    } catch (error) {}
  };

  const handleCancelEdit = () => {
    dispatch(stopEditingLink());
  };

  const handleDeleteLink = async (linkId) => {
    if (!profile?.uid) {
      dispatch(setError("Kullanıcı girişi yapılmamış. Lütfen giriş yapın."));
      return;
    }

    try {
      await dispatch(deleteLinkById({ userId: profile.uid, linkId })).unwrap();
    } catch (error) {}
  };

  const handleFieldChange = (field, value) => {
    if (isEditingLink) {
      dispatch(updateEditingLinkField({ field, value }));
    } else {
      dispatch(updateNewLinkField({ field, value }));
    }
  };

  const handleStartAddingLink = () => {
    dispatch(setIsAddingLink(true));
  };

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-dark-text)" }}
        >
          {isEditingLink ? "Bağlantıyı Düzenle" : "Bağlantılarım"}
        </h2>
        {!isEditingLink && (
          <button
            onClick={handleStartAddingLink}
            className="px-4 py-2 rounded-lg transition-colors flex items-center justify-center sm:justify-start w-full sm:w-auto"
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

      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-danger)" }}
        >
          {error}
        </div>
      )}

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
