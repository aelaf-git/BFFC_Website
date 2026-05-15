/**
 * Brand assets and colors sampled from the official logo.
 * Logo file: public/brand/logo.png
 */
export const brand = {
  logo: {
    src: "/brand/logo.png",
    alt: "Bright Future For Children Organization",
    width: 1024,
    height: 704,
  },
  /** Square crop — used by app/icon.png, favicon.ico, and metadata icons */
  icon: {
    src: "/brand/favicon-32.png",
    width: 32,
    height: 32,
  },
  colors: {
    primary: "#f39120",
    primaryHover: "#d97d15",
    primaryLight: "#fef3e8",
    accentBlue: "#1d4e89",
  },
} as const;
