import type { ReactNode } from "react";
import Image from "next/image";

const sizeClasses = {
  default: "h-64 sm:h-80",
  compact: "h-56 sm:h-64",
  medium: "h-56 sm:h-72",
  tall: "h-[22rem] sm:h-[30rem] lg:h-[34rem]",
  story: "h-[55vh] min-h-[320px] sm:h-[65vh]",
} as const;

type PageHeroSize = keyof typeof sizeClasses;

type PageHeroProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: ReactNode;
  kicker?: ReactNode;
  size?: PageHeroSize;
  align?: "center" | "bottom";
  priority?: boolean;
  decorativeImage?: boolean;
  titleClassName?: string;
  imageItemProp?: string;
  children?: ReactNode;
};

export function PageHero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  kicker,
  size = "default",
  align = "center",
  priority = true,
  decorativeImage = false,
  titleClassName,
  imageItemProp,
  children,
}: PageHeroProps) {
  const content = children ?? (
    <>
      {kicker && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          {kicker}
        </div>
      )}
      <h1
        className={
          titleClassName ??
          "font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
        }
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-xl text-base font-light text-white/85">{subtitle}</p>
      )}
    </>
  );

  return (
    <div
      className={`relative w-full overflow-hidden bg-zinc-900 ${sizeClasses[size]}`}
    >
      <Image
        src={imageSrc}
        alt={decorativeImage ? "" : imageAlt}
        fill
        priority={priority}
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden={decorativeImage || undefined}
        itemProp={imageItemProp}
      />
      <div
        className={`absolute inset-0 ${
          align === "bottom"
            ? "bg-gradient-to-t from-black/75 via-black/15 to-black/30"
            : "bg-black/60"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 flex flex-col px-6 text-center ${
          align === "bottom"
            ? "items-center justify-end pb-12 sm:px-10 sm:pb-16 lg:pb-20"
            : "items-center justify-center"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
