import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [links, setLinks] = useState([
    {
      id: 1,
      title: "GitHub",
      url: "https://github.com/username",
      icon: "github",
      clicks: 124,
    },
    {
      id: 2,
      title: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "linkedin",
      clicks: 89,
    },
    {
      id: 3,
      title: "Kişisel Web Sitem",
      url: "https://example.com",
      icon: "globe",
      clicks: 56,
    },
    {
      id: 4,
      title: "Twitter",
      url: "https://twitter.com/username",
      icon: "twitter",
      clicks: 47,
    },
  ]);
  const [newLink, setNewLink] = useState({ title: "", url: "", icon: "link" });
  const [isAddingLink, setIsAddingLink] = useState(false);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Erişim Reddedildi
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Bu sayfayı görüntülemek için giriş yapmalısınız.
          </p>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

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

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "github":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        );
      case "globe":
        return (
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
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
      default:
        return (
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
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {currentUser.email}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              iyilink.co/{currentUser.uid.substring(0, 8)}
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Profili Düzenle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Toplam Görüntülenme
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              316
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">
              Bu Ay
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              87
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Bağlantılarım
          </h2>
          <button
            onClick={() => setIsAddingLink(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
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
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="LinkedIn, GitHub, vb."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddingLink(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ekle
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mr-4">
                  {getIconComponent(link.icon)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {link.title}
                  </h3>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {link.url}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Tıklamalar
                  </span>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {link.clicks}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
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
                    className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
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
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Henüz hiç bağlantı eklemediniz.
              </p>
              <button
                onClick={() => setIsAddingLink(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Profil Önizleme
        </h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
            {currentUser.email.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
            {currentUser.email.split("@")[0]}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Sosyal medya hesaplarım ve kişisel linklerim
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors flex items-center justify-center"
              >
                <span className="mr-2">{getIconComponent(link.icon)}</span>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
