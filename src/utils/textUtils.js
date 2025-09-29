// Metin uzunluğuna göre dinamik font boyutu hesaplama
export const getResponsiveFontSize = (text, baseSizeRem = 1.25) => {
  if (!text) return `${baseSizeRem}rem`;

  const length = text.length;

  if (length > 25) {
    return `${Math.max(baseSizeRem * 0.6, 0.75)}rem`;
  } else if (length > 18) {
    return `${Math.max(baseSizeRem * 0.75, 0.875)}rem`;
  } else if (length > 12) {
    return `${Math.max(baseSizeRem * 0.9, 1)}rem`;
  }

  return `${baseSizeRem}rem`;
};

export const truncateUsername = (username, maxLength = 20) => {
  if (!username) return "";

  if (username.length <= maxLength) {
    return username;
  }

  return username.substring(0, maxLength - 3) + "...";
};
export const getResponsiveTextClasses = (text) => {
  if (!text) return "";

  const length = text.length;

  if (length > 25) {
    return "text-sm sm:text-base lg:text-lg";
  } else if (length > 18) {
    return "text-base sm:text-lg lg:text-xl";
  } else if (length > 12) {
    return "text-lg sm:text-xl lg:text-2xl";
  }

  return "text-xl sm:text-2xl lg:text-3xl";
};

export const shortenUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + (urlObj.pathname !== "/" ? "..." : "");
  } catch {
    return url.length > 25 ? url.substring(0, 22) + "..." : url;
  }
};

export const mediumShortenUrl = (url) => {
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
