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
  const [originalUsername, setOriginalUsername] = useState("");
  const [imageError, setImageError] = useState(false);
  const [photoType, setPhotoType] = useState("url"); // "url" veya "file" seçenekleri
  const [localImagePreview, setLocalImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    watch,
    setValue,
    getValues,
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
  const watchedPhotoURL = watch("photoURL");

  // Component yüklendiğinde orijinal username'i kaydet
  useEffect(() => {
    if (profile?.username) {
      setOriginalUsername(profile.username);
    }

    // Eğer profilde photoURL varsa, başlangıçta URL tipini seç
    if (profile?.photoURL && profile.photoURL.startsWith("http")) {
      setPhotoType("url");
    } else if (profile?.photoURL && profile.photoURL.startsWith("data:image")) {
      setPhotoType("file");
      setLocalImagePreview(profile.photoURL);
    }
  }, [profile]);

  // Resim değiştiğinde hata durumunu sıfırla
  useEffect(() => {
    setImageError(false);
  }, [watchedPhotoURL]);

  // Dosya yükleme işlemi
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB kontrol
        setImageError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setValue("photoURL", base64Image, { shouldDirty: true }); // Form değerine base64 veriyi ekle ve dirty olarak işaretle
        setLocalImagePreview(base64Image);
        setImageError(false);
      };
      reader.onerror = () => {
        setImageError(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form gönderildiğinde ilk çalışacak fonksiyon - username kontrolü
  const onSubmit = (data) => {
    if (!isDirty) return;

    // Username değişikliği var mı kontrol et
    if (data.username !== originalUsername) {
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
    const currentFormData = getValues();
    setShowUsernameModal(false);
    saveProfileData(currentFormData);
  };

  // Username değişikliğini iptal et
  const cancelUsernameChange = () => {
    setShowUsernameModal(false);
  };

  // Profil yüklenmediyse yükleniyor mesajı göster
  if (!profile) {
    return <div>Profil bilgileri yükleniyor...</div>;
  }

  // Resim yüklenirken hata oluşursa hata durumunu güncelle
  const handleImageError = () => {
    setImageError(true);
  };

  // Profil fotoğrafı seçim tipini değiştir
  const changePhotoType = (type) => {
    setPhotoType(type);
    if (type === "url") {
      setLocalImagePreview(null);
      // Eğer URL tipine geçerken değer varsa, form değişikliği olarak işaretle
      if (profile?.photoURL !== watchedPhotoURL) {
        setValue("photoURL", watchedPhotoURL, { shouldDirty: true });
      }
    } else {
      // Dosya tipine geçerken değeri sıfırla ve dirty olarak işaretle
      setValue("photoURL", "", { shouldDirty: true });
    }
    setImageError(false);
  };

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
                {watchedUsername}" olacaktır.
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
              Profil Fotoğrafı
            </label>

            {/* Seçenek butonları */}
            <div className="flex space-x-4 mb-3">
              <button
                type="button"
                onClick={() => changePhotoType("url")}
                className="px-3 py-1.5 rounded text-sm font-medium"
                style={{
                  backgroundColor:
                    photoType === "url"
                      ? "var(--color-primary)"
                      : "var(--color-neutral-light)",
                  color:
                    photoType === "url" ? "white" : "var(--color-dark-text)",
                }}
              >
                URL ile ekle
              </button>
              <button
                type="button"
                onClick={() => changePhotoType("file")}
                className="px-3 py-1.5 rounded text-sm font-medium"
                style={{
                  backgroundColor:
                    photoType === "file"
                      ? "var(--color-primary)"
                      : "var(--color-neutral-light)",
                  color:
                    photoType === "file" ? "white" : "var(--color-dark-text)",
                }}
              >
                Cihazdan yükle
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="flex-1">
                {photoType === "url" ? (
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
                ) : (
                  <div className="w-full">
                    <input
                      type="file"
                      id="photoFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="photoFile"
                      className="flex items-center justify-center w-full p-2 rounded border cursor-pointer"
                      style={{
                        borderColor: "var(--color-border)",
                        backgroundColor: "var(--color-input-bg)",
                        color: "var(--color-dark-text)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {localImagePreview
                        ? "Fotoğrafı değiştir"
                        : "Fotoğraf seç"}
                    </label>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--color-light-text)" }}
                    >
                      En fazla 5MB boyutunda bir görsel yükleyebilirsiniz
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-3 md:mt-0">
                <div
                  className="w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {photoType === "url" && watchedPhotoURL && !imageError ? (
                    <img
                      src={watchedPhotoURL}
                      alt="Profil Önizleme"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : photoType === "file" && localImagePreview ? (
                    <img
                      src={localImagePreview}
                      alt="Profil Önizleme"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-neutral-light)" }}
                    >
                      <span style={{ color: "var(--color-light-text)" }}>
                        {imageError ? "Hata" : "Resim Yok"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {imageError && (
              <span className="text-red-500 text-xs mt-1">
                {photoType === "file"
                  ? "Dosya yüklenemedi veya çok büyük (5MB limit)."
                  : "Resim yüklenemedi. Lütfen geçerli bir URL giriniz."}
              </span>
            )}
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
