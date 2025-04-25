import React from "react";
import LinkItem from "./LinkItem";

const LinkList = ({
  links,
  loading,
  isEditingLink,
  profile,
  onEdit,
  onDelete,
  onAdd,
  getIconComponent,
}) => {
  if (!profile?.uid) {
    return (
      <div className="text-center py-8">
        <p style={{ color: "var(--color-light-text)" }}>
          Bağlantılarınızı görmek için giriş yapmalısınız.
        </p>
      </div>
    );
  }

  if (loading && links.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: "var(--color-light-text)" }}>
          Bağlantılar yükleniyor...
        </p>
      </div>
    );
  }

  if (!loading && links.length === 0) {
    return (
      <div
        className="text-center py-12 px-6 rounded-lg border"
        style={{
          backgroundColor: "var(--color-neutral-light)",
          borderColor: "var(--color-border)",
          boxShadow: "0 2px 4px var(--color-shadow)",
        }}
      >
        <p className="mb-4" style={{ color: "var(--color-light-text)" }}>
          Henüz hiç bağlantı eklemediniz.
        </p>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-lg transition-colors inline-flex items-center"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          İlk Bağlantınızı Ekleyin
        </button>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 400px)" }}
    >
      {links.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          isEditingMode={isEditingLink}
          getIconComponent={getIconComponent}
        />
      ))}
    </div>
  );
};

export default LinkList;
