# 🔗 IyiLink - Kişisel Link Yönetim Platformu

<div align="center">
  <p>
    <strong>IyiLink</strong>, sosyal medya hesaplarınızı ve önemli linklerinizi tek bir yerde toplayabileceğiniz modern bir platform.
  </p>
  
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## 📋 İçindekiler

- [🌟 Özellikler](#-özellikler)
- [🚀 Teknolojiler](#-teknolojiler)
- [⚡ Kurulum](#-kurulum)
- [🎯 Kullanım](#-kullanım)
- [🏗️ Proje Yapısı](#️-proje-yapısı)
- [🔧 Konfigürasyon](#-konfigürasyon)
- [📱 Özellik Detayları](#-özellik-detayları)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)

## 🌟 Özellikler

### ✨ Temel Özellikler

- **🔐 Kullanıcı Yönetimi**: Firebase Authentication ile güvenli giriş/kayıt
- **🔗 Link Yönetimi**: Sosyal medya ve web sitesi linklerini organize edin
- **📱 Responsive Tasarım**: Mobil ve masaüstü cihazlarda mükemmel görünüm
- **🌙 Tema Desteği**: Özelleştirilebilir renk temaları
- **📊 İstatistikler**: Link tıklama sayıları ve profil görüntüleme analytics

### 🎨 Gelişmiş Özellikler

- **🖱️ Drag & Drop Sıralama**: Link'lerinizi sürükleyip bırakarak yeniden sıralayın
- **👤 Kişisel Profil Sayfası**: `/{username}` formatında özel profil URL'leri
- **🔄 Gerçek Zamanlı Önizleme**: Değişiklikleri anında görün
- **📈 Analytics Dashboard**: Detaylı kullanım istatistikleri

### 🎯 Kullanıcı Deneyimi

- **⚡ Hızlı Yükleme**: Vite ile optimize edilmiş performans
- **🎭 Smooth Animasyonlar**: Modern CSS transitions ve @dnd-kit animasyonları

## 🚀 Teknolojiler

### Frontend

- **⚛️ React 19** - Modern UI geliştirme
- **🏪 Redux Toolkit** - State management ve caching
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🖱️ @dnd-kit** - Drag and drop işlevselliği
- **📱 React Hook Form** - Form yönetimi ve validasyon
- **🧭 React Router** - Client-side routing

### Backend & Database

- **🔥 Firebase Firestore** - NoSQL veritabanı
- **🔐 Firebase Authentication** - Kullanıcı doğrulama
- **💾 Firebase Storage** - Dosya depolama

### Development Tools

- **⚡ Vite** - Modern build tool ve dev server
- **🔍 ESLint** - Code quality ve standards
- **🎯 PostCSS** - CSS processing
- **📦 npm** - Package management

## ⚡ Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Firebase hesabı

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/your-username/iyilink.git
cd iyilink
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Firebase Konfigürasyonu

Firebase console'dan yeni bir proje oluşturun ve konfigürasyon bilgilerini `.env` dosyasına ekleyin:

```bash
# .env dosyası oluşturun
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:5173 adresinde çalışacaktır.

## 🎯 Kullanım

### 👤 Hesap Oluşturma

1. Ana sayfadan "Kayıt Ol" butonuna tıklayın
2. Email ve şifrenizi girin
3. Kullanıcı adınızı belirleyin (profil URL'iniz olacak)

### 🔗 Link Ekleme

1. Dashboard'da "Bağlantı Ekle" butonuna tıklayın
2. Link başlığı ve URL'sini girin
3. Uygun ikonu seçin
4. "Kaydet" butonuna tıklayın

### 🖱️ Link Sıralama

1. Link listesinde hamburger menü (≡) ikonunu görün
2. İkona tıklayıp tutarak link'i sürükleyin
3. İstediğiniz konuma bırakın
4. Sıralama otomatik olarak kaydedilir

### 📱 Profil Paylaşma

Profil URL'inizi paylaşın: `https://iyilink.co/{username}`

### Vite Konfigürasyonu

Proje zaten optimize edilmiş Vite konfigürasyonu ile gelir. Özelleştirmek için `vite.config.js` dosyasını düzenleyebilirsiniz.

## 📱 Özellik Detayları

### 🖱️ Drag & Drop Sıralama

- **@dnd-kit** kütüphanesi kullanılarak geliştirildi
- Touch device'lar için tam destek
- Smooth animasyonlar ve görsel geri bildirim
- Accessibility (a11y) desteği
- Klavye navigasyonu

### 📊 Analytics & İstatistikler

- Link tıklama sayıları
- Profil görüntüleme istatistikleri
- Gerçek zamanlı veri güncellemeleri

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - UI framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

<div align="center">
  <p>🔗 <strong>IyiLink</strong> ile linklerinizi organize edin ve paylaşın!</p>
</div>
