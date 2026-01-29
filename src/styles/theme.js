export const theme = {
  colors: {
    primary: "#7E57C2", // Ana mor renk (Login butonu vs.)
    secondary: "#24CCA7", // Yeşil (Gelir/Income)
    accent: "#FF6596", // Kırmızı/Pembe (Gider/Expense)
    background: "#E5E5E5", // Genel arka plan gri
    white: "#FFFFFF",
    black: "#000000",
    textPrimary: "#000000",
    textSecondary: "#A6A6A6", // Gri metinler
    overlay: "rgba(0, 0, 0, 0.25)", // Modal arkası gölge
  },
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1280px",
  },
  spacing: (value) => `${4 * value}px`, // 4'ün katları şeklinde boşluk (spacing(2) = 8px)
};
