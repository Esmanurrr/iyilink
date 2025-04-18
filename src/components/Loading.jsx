import React from "react";

const Loading = ({ message = "Yükleniyor..." }) => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="p-8 rounded-lg shadow-lg text-center"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        <div className="flex justify-center mb-6">
          <div className="flex flex-row gap-3">
            <div
              className="w-5 h-5 rounded-full animate-bounce"
              style={{ backgroundColor: "var(--color-primary)" }}
            ></div>
            <div
              className="w-5 h-5 rounded-full animate-bounce [animation-delay:-.3s]"
              style={{ backgroundColor: "var(--color-primary)" }}
            ></div>
            <div
              className="w-5 h-5 rounded-full animate-bounce [animation-delay:-.5s]"
              style={{ backgroundColor: "var(--color-primary)" }}
            ></div>
          </div>
        </div>
        <p
          style={{ color: "var(--color-dark-text)" }}
          className="text-lg font-medium"
        >
          {message}
        </p>
        <p
          style={{ color: "var(--color-light-text)" }}
          className="text-sm mt-2"
        >
          İyiLink'i kullandığınız için teşekkürler
        </p>
      </div>
    </div>
  );
};

export default Loading;
