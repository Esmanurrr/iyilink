import React from "react";

const LinkItem = ({
  link,
  onEdit,
  onDelete,
  loading,
  isEditingMode,
  getIconComponent,
}) => {
  return (
    <div
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
            onClick={() => onEdit(link.id)}
            className="p-2 rounded-md transition-colors"
            style={{
              backgroundColor: "var(--color-neutral)",
              color: "var(--color-primary)",
            }}
            disabled={loading || isEditingMode}
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
            onClick={() => onDelete(link.id)}
            className="p-2 rounded-md transition-colors"
            style={{
              backgroundColor: "var(--color-neutral)",
              color: "var(--color-danger)",
            }}
            disabled={loading || isEditingMode}
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
  );
};

export default LinkItem;
