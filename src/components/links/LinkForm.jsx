import React from "react";

const LinkForm = ({
  type = "add", // "add" veya "edit"
  formData,
  loading,
  onSubmit,
  onCancel,
  onChange,
}) => {
  const isEdit = type === "edit";
  const title = isEdit ? "Bağlantıyı Düzenle" : "Yeni Bağlantı";
  const submitText = isEdit ? "Güncelle" : "Ekle";
  const loadingText = isEdit ? "Güncelleniyor..." : "Ekleniyor...";

  const handleFieldChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-5 rounded-lg mb-6"
      style={{
        backgroundColor: "var(--color-accent)",
        boxShadow: "0 2px 4px var(--color-shadow)",
      }}
    >
      {isEdit && (
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--color-dark-text)" }}
        >
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--color-dark-text)" }}
          >
            Başlık
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-dark-text)",
            }}
            placeholder="LinkedIn, GitHub, vb."
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--color-dark-text)" }}
          >
            URL
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => handleFieldChange("url", e.target.value)}
            className="w-full p-3 border rounded-lg"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-dark-text)",
            }}
            placeholder="https://example.com"
            required
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: "var(--color-neutral)",
            borderColor: "var(--color-border)",
            color: "var(--color-dark-text)",
          }}
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            boxShadow: "0 2px 4px var(--color-shadow)",
          }}
          disabled={loading}
        >
          {loading ? loadingText : submitText}
        </button>
      </div>
    </form>
  );
};

export default LinkForm;
