/**
 * Brand assets and colors sampled from the official logo.
 * Logo file: public/brand/logo.png
 */
export const brand = {
  logo: {
    src: "/brand/logo.png",
    alt: "Bright Future for Children",
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
    accent: "#1a3a6b",
    accentHover: "#142f56",
    accentLight: "#e8edf4",
    accentDeep: "#0d2240",
    /** @deprecated Use accent */
    accentBlue: "#1a3a6b",
  },
} as const;
