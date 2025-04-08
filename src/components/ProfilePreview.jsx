const ProfilePreview = ({ currentUser, links, getIconComponent }) => {
  return (
    <div
      className="rounded-xl p-6 sticky top-4 h-full"
      style={{
        backgroundColor: "var(--color-card-bg)",
        boxShadow: "0 4px 12px var(--color-shadow)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "var(--color-dark-text)" }}
      >
        Profil Önizleme
      </h2>
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
          {currentUser.email.charAt(0).toUpperCase()}
        </div>
        <h3
          className="text-lg font-medium mb-1"
          style={{ color: "var(--color-dark-text)" }}
        >
          {currentUser.email.split("@")[0]}
        </h3>
        <p
          className="mb-6 text-sm"
          style={{ color: "var(--color-light-text)" }}
        >
          Sosyal medya hesaplarım ve kişisel linklerim
        </p>

        <div className="space-y-3 max-w-sm mx-auto">
          {links.map((link) => (
            <a
              key={link.id}
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
            >
              <span className="mr-2" style={{ color: "var(--color-primary)" }}>
                {getIconComponent(link.icon)}
              </span>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
