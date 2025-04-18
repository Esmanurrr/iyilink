import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.user);

  // Modal durumunu kontrol etmek için state
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [originalUsername, setOriginalUsername] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: profile?.name || "",
      surname: profile?.surname || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
      photoURL: profile?.photoURL || "",
      username: profile?.username || "",
    },
  });

  const watchedUsername = watch("username");

  // Component yüklendiğinde orijinal username'i kaydet
  useEffect(() => {
    if (profile?.username) {
      setOriginalUsername(profile.username);
    }
  }, [profile]);

  // Form gönderildiğinde ilk çalışacak fonksiyon - username kontrolü
  const onSubmit = (data) => {
    if (!isDirty) return;

    // Username değişikliği var mı kontrol et
    if (data.username !== originalUsername) {
      setFormData(data);
      setShowUsernameModal(true);
      return;
    }

    // Username değişmemişse direkt kaydet
    saveProfileData(data);
  };

  // Profil verilerini kaydeden asıl fonksiyon
  const saveProfileData = (data) => {
    dispatch(
      updateUserProfile({
        uid: profile.uid,
        userData: data,
      })
    )
      .unwrap()
      .then(() => {
        reset(data); // Formu güncellenen değerlerle sıfırla
        if (data.username !== originalUsername) {
          setOriginalUsername(data.username);
        }
      })
      .catch((error) => {
        console.error("Profil güncellenirken hata oluştu:", error);
      });
  };

  // Username değişikliğini onayla
  const confirmUsernameChange = () => {
    setShowUsernameModal(false);
    if (formData) {
      saveProfileData(formData);
      setFormData(null);
    }
  };

  // Username değişikliğini iptal et
  const cancelUsernameChange = () => {
    setShowUsernameModal(false);
    setFormData(null);
  };

  // Profil yüklenmediyse yükleniyor mesajı göster
  if (!profile) {
    return <div>Profil bilgileri yükleniyor...</div>;
  }

  return (
    <div>
      {/* Üst Navigasyon */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm px-3 py-1 rounded flex items-center"
          style={{
            backgroundColor: "var(--color-neutral-light)",
            color: "var(--color-dark-text)",
          }}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Dashboard'a Dön
        </button>
      </div>

      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: "var(--color-card-bg)",
          boxShadow: "0 4px 12px var(--color-shadow)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Username değişikliği modal'ı */}
        {showUsernameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-lg max-w-md w-full"
              style={{
                backgroundColor: "var(--color-card-bg)",
                boxShadow: "0 4px 12px var(--color-shadow)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "var(--color-dark-text)" }}
              >
                Kullanıcı Adı Değişikliği
              </h3>
              <p className="mb-4" style={{ color: "var(--color-light-text)" }}>
                Kullanıcı adınızı değiştirmek üzeresiniz. Bu değişiklik
                profilinizin linkini etkileyecektir. Eski link "
                {originalUsername}" artık çalışmayacak ve yeni linkiniz "
                {formData?.username}" olacaktır.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelUsernameChange}
                  className="px-4 py-2 rounded font-medium"
                  style={{
                    backgroundColor: "var(--color-neutral-light)",
                    color: "var(--color-dark-text)",
                  }}
                >
                  İptal
                </button>
                <button
                  onClick={confirmUsernameChange}
                  className="px-4 py-2 rounded font-medium"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  Değişikliği Onayla
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-dark-text)" }}
          >
            Profil Bilgilerini Düzenle
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                style={{ color: "var(--color-dark-text)" }}
              >
                Ad
              </label>
              <input
                type="text"
                {...register("name", { required: "Ad alanı gereklidir" })}
                className="w-full p-2 rounded border"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-input-bg)",
                  color: "var(--color-dark-text)",
                }}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium"
                style={{ color: "var(--color-dark-text)" }}
              >
                Soyad
              </label>
              <input
                type="text"
                {...register("surname", { required: "Soyad alanı gereklidir" })}
                className="w-full p-2 rounded border"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-input-bg)",
                  color: "var(--color-dark-text)",
                }}
              />
              {errors.surname && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.surname.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-dark-text)" }}
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              {...register("username", {
                required: "Kullanıcı adı gereklidir",
                pattern: {
                  value: /^[a-z0-9_-]+$/i,
                  message:
                    "Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir",
                },
              })}
              className="w-full p-2 rounded border"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-input-bg)",
                color: "var(--color-dark-text)",
              }}
            />
            {errors.username && (
              <span className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </span>
            )}
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-light-text)" }}
            >
              Bu kullanıcı adı profilinizin URL'inde kullanılacaktır:{" "}
              {window.location.origin}/{watchedUsername || originalUsername}
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-dark-text)" }}
            >
              E-posta
            </label>
            <input
              type="email"
              {...register("email", {
                required: "E-posta alanı gereklidir",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Geçerli bir e-posta adresi giriniz",
                },
              })}
              className="w-full p-2 rounded border"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-input-bg)",
                color: "var(--color-dark-text)",
              }}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-dark-text)" }}
            >
              Profil Fotoğrafı URL'i
            </label>
            <input
              type="url"
              {...register("photoURL")}
              className="w-full p-2 rounded border"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-input-bg)",
                color: "var(--color-dark-text)",
              }}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-dark-text)" }}
            >
              Biyografi
            </label>
            <textarea
              {...register("bio")}
              rows="4"
              className="w-full p-2 rounded border"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-input-bg)",
                color: "var(--color-dark-text)",
              }}
              placeholder="Kendiniz hakkında kısa bir açıklama..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isDirty || loading}
              className="px-4 py-2 rounded font-medium transition-colors"
              style={{
                backgroundColor: isDirty
                  ? "var(--color-primary)"
                  : "var(--color-neutral-light)",
                color: isDirty ? "white" : "var(--color-light-text)",
                opacity: loading ? 0.7 : 1,
                cursor: !isDirty || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
