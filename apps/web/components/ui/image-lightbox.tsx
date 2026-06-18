"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export type LightboxImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxContextValue = {
  images: LightboxImageItem[];
  open: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("LightboxImage must be used within a LightboxProvider");
  }
  return ctx;
}

type LightboxProviderProps = {
  images: LightboxImageItem[];
  children: ReactNode;
};

/** Optional provider — enables prev/next when multiple images share one lightbox. */
export function LightboxProvider({ images, children }: LightboxProviderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const open = useCallback((index: number) => setActiveIndex(index), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? images.length - 1 : current - 1;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === images.length - 1 ? 0 : current + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  const active = activeIndex !== null ? images[activeIndex] : null;
  const hasMultiple = images.length > 1;

  return (
    <LightboxContext.Provider value={{ images, open }}>
      {children}

      {active && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close fullscreen image"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </>
          )}

          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            onClick={close}
            aria-hidden
            tabIndex={-1}
          />

          <figure
            className="relative z-[1] flex max-h-full max-w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[85vh] w-full max-w-6xl">
              {/* eslint-disable-next-line @next/next/no-img-element -- full-resolution public assets in overlay */}
              <img
                src={active.src}
                alt={active.alt}
                className="mx-auto max-h-[85vh] w-auto max-w-full object-contain"
              />
            </div>
            {(active.caption || active.alt) && (
              <figcaption className="mt-4 max-w-2xl text-center text-sm font-light text-white/80">
                {active.caption ?? active.alt}
              </figcaption>
            )}
            {hasMultiple && activeIndex !== null && (
              <p className="mt-2 text-xs text-white/50">
                {activeIndex + 1} / {images.length}
              </p>
            )}
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

type LightboxImageProps = {
  index: number;
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Classes on the outer clickable wrapper */
  wrapperClassName?: string;
  /** Classes on the Next.js Image */
  imageClassName?: string;
};

/**
 * Click-to-expand image. Wrap in LightboxProvider for gallery navigation,
 * or use StandaloneLightboxImage for a single image without a provider.
 */
export function LightboxImage({
  index,
  src,
  alt,
  sizes,
  priority,
  wrapperClassName = "",
  imageClassName = "object-cover",
}: LightboxImageProps) {
  const { open } = useLightbox();

  return (
    <button
      type="button"
      onClick={() => open(index)}
      className={`group/lightbox relative block w-full cursor-zoom-in overflow-hidden text-left ${wrapperClassName}`}
      aria-label={`View fullscreen: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`transition-transform duration-700 group-hover/lightbox:scale-[1.03] ${imageClassName}`}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/lightbox:bg-black/10" />
      <span className="pointer-events-none absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/lightbox:opacity-100">
        <ZoomIn className="h-4 w-4" aria-hidden />
      </span>
    </button>
  );
}

type StandaloneLightboxImageProps = Omit<LightboxImageProps, "index">;

/** Single-image lightbox without a provider — use on one-off detail pages. */
export function StandaloneLightboxImage(props: StandaloneLightboxImageProps) {
  return (
    <LightboxProvider images={[{ src: props.src, alt: props.alt }]}>
      <LightboxImage index={0} {...props} />
    </LightboxProvider>
  );
}
