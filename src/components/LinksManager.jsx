import { useState } from "react";

const LinksManager = ({
  links,
  setLinks,
  isAddingLink,
  setIsAddingLink,
  getIconComponent,
}) => {
  const [newLink, setNewLink] = useState({ title: "", url: "", icon: "link" });

  const handleAddLink = (e) => {
    e.preventDefault();

    if (!newLink.title || !newLink.url) return;

    const updatedLink = {
      ...newLink,
      id: Date.now(),
      clicks: 0,
    };

    setLinks([...links, updatedLink]);
    setNewLink({ title: "", url: "", icon: "link" });
    setIsAddingLink(false);
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
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
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-dark-text)" }}
        >
          Bağlantılarım
        </h2>
        <button
          onClick={() => setIsAddingLink(true)}
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Bağlantı Ekle
        </button>
      </div>

      {isAddingLink && (
        <form
          onSubmit={handleAddLink}
          className="p-5 rounded-lg mb-6"
          style={{
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 2px 4px var(--color-shadow)",
          }}
        >
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
                value={newLink.title}
                onChange={(e) =>
                  setNewLink({ ...newLink, title: e.target.value })
                }
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
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
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
              onClick={() => setIsAddingLink(false)}
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
            >
              Ekle
            </button>
          </div>
        </form>
      )}

      <div
        className="space-y-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 400px)" }}
      >
        {links.map((link) => (
          <div
            key={link.id}
            className="p-4 rounded-lg flex justify-between items-center border-l-4"
            style={{
              backgroundColor: "var(--color-neutral-light)",
              borderLeftColor: "var(--color-primary)",
              borderColor: "var(--color-border)",
              boxShadow: "0 2px 4px var(--color-shadow)",
            }}
          >
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-primary)",
                }}
              >
                {getIconComponent(link.icon)}
              </div>
              <div>
                <h3
                  className="font-medium"
                  style={{ color: "var(--color-dark-text)" }}
                >
                  {link.title}
                </h3>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: "var(--color-link)" }}
                >
                  {link.url}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span
                  className="text-sm"
                  style={{ color: "var(--color-light-text)" }}
                >
                  Tıklamalar
                </span>
                <p
                  className="font-medium"
                  style={{ color: "var(--color-dark-text)" }}
                >
                  {link.clicks}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 rounded-md transition-colors"
                  style={{
                    backgroundColor: "var(--color-neutral)",
                    color: "var(--color-primary)",
                  }}
                >
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-2 rounded-md transition-colors"
                  style={{
                    backgroundColor: "var(--color-neutral)",
                    color: "var(--color-danger)",
                  }}
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {links.length === 0 && (
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
              onClick={() => setIsAddingLink(true)}
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
        )}
      </div>
    </div>
  );
};

export default LinksManager;
