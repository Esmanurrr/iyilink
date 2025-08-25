import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LinkItem = ({
  link,
  onEdit,
  onDelete,
  loading,
  isEditingMode,
  getIconComponent,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const shortenUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + (urlObj.pathname !== "/" ? "..." : "");
    } catch {
      return url.length > 25 ? url.substring(0, 22) + "..." : url;
    }
  };

  const mediumShortenUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let path = urlObj.pathname;
      if (path.length > 15) {
        path = path.substring(0, 12) + "...";
      }
      return urlObj.hostname + path;
    } catch {
      return url.length > 40 ? url.substring(0, 37) + "..." : url;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 gap-3 sortable-item ${
        isDragging ? "is-dragging" : ""
      }`}
      style={{
        ...style,
        backgroundColor: "var(--color-neutral-light)",
        borderLeftColor: "var(--color-primary)",
        borderColor: "var(--color-border)",
        boxShadow: isDragging
          ? "0 8px 20px var(--color-shadow)"
          : "0 2px 4px var(--color-shadow)",
      }}
    >
      <div className="flex items-center w-full sm:w-auto">
        <div
          {...attributes}
          {...listeners}
          className="w-6 h-6 sm:w-8 sm:h-8 mr-2 flex items-center justify-center cursor-grab active:cursor-grabbing flex-shrink-0 touch-none drag-handle"
          style={{
            color: "var(--color-light-text)",
            opacity: isDragging ? 0.5 : 0.6,
            touchAction: "none",
          }}
          title="Sürükleyerek sırayı değiştir"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>

        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
          style={{
            backgroundColor: "var(--color-primary-hover)",
            color: "var(--color-primary)",
          }}
        >
          {getIconComponent(link.icon)}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className="font-medium text-sm sm:text-base truncate"
            style={{ color: "var(--color-dark-text)" }}
          >
            {link.title}
          </h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm hover:underline truncate block max-w-[280px] md:max-w-[400px]"
            style={{ color: "var(--color-link)" }}
            title={link.url}
          >
            <span className="hidden xl:inline">{link.url}</span>
            <span className="hidden md:inline xl:hidden">
              {mediumShortenUrl(link.url)}
            </span>
            <span className="md:hidden">{shortenUrl(link.url)}</span>
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between w-full sm:w-auto sm:space-x-4 flex-shrink-0 min-w-[120px] max-sm:flex-col max-sm:items-start">
        <div className="text-left sm:text-right mr-2 whitespace-nowrap min-w-[70px]">
          <span
            className="text-xs sm:text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            Tıklamalar
          </span>
          <p
            className="font-medium text-sm sm:text-base"
            style={{ color: "var(--color-dark-text)" }}
          >
            {link.clicks}
          </p>
        </div>
        <div className="flex space-x-2 flex-shrink-0 mt-2 sm:mt-0">
          <button
            onClick={() => onEdit(link.id)}
            className="p-1.5 sm:p-2 rounded-md transition-colors flex-shrink-0"
            style={{
              backgroundColor: "var(--color-neutral)",
              color: "var(--color-primary)",
            }}
            disabled={loading || isEditingMode}
            title="Düzenle"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
            className="p-1.5 sm:p-2 rounded-md transition-colors flex-shrink-0"
            style={{
              backgroundColor: "var(--color-neutral)",
              color: "var(--color-danger)",
            }}
            disabled={loading || isEditingMode}
            title="Sil"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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
