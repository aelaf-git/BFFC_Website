export const ACADEMY_ASSET_BASE = "/Bright-Future-Academy-for-Afar-Empowerment";

export const academyHeroImage = `${ACADEMY_ASSET_BASE}/img1.png`;

export const academyVideo = `${ACADEMY_ASSET_BASE}/video.mp4`;

export const academyUrgentImage = {
  src: `${ACADEMY_ASSET_BASE}/img11.png`,
  alt: "Exterior view of modern dormitory buildings at Bright Future Children's Village",
};

/** All campus gallery images — uniform grid on the detail page */
export const academyGalleryImages = [
  {
    src: `${ACADEMY_ASSET_BASE}/img9.png`,
    alt: "Aerial view of the Bright Future Children's Village campus in Awash",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img12.png`,
    alt: "Master plan of the academy with dormitories, courtyard, and sports field",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img8.png`,
    alt: "Main academic building overlooking the campus football pitch",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img10.png`,
    alt: "Central courtyard with gardens and seating between academic wings",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img7.png`,
    alt: "Outdoor common area with benches and gardens between residence halls",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img6.png`,
    alt: "Campus clinic building with landscaped courtyard and flower gardens",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img5.png`,
    alt: "Outdoor basketball court between campus buildings",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img4.png`,
    alt: "Student study room with desk, computer, and bookshelf",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img3.png`,
    alt: "Student dormitory bedroom with study desk and natural light",
  },
  {
    src: `${ACADEMY_ASSET_BASE}/img2.png`,
    alt: "Dormitory hallway with private room entrances",
  },
] as const;

/** All expandable images on the detail page, in display order (for lightbox navigation). */
export const academyLightboxImages = [
  { src: academyUrgentImage.src, alt: academyUrgentImage.alt },
  ...academyGalleryImages.map(({ src, alt }) => ({ src, alt })),
];

export const academyLightboxIndex = {
  urgent: 0,
  galleryStart: 1,
} as const;
