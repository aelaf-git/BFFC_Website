"use client";

import type { ReactNode } from "react";
import type { LightboxImageItem } from "@/components/ui/image-lightbox";
import { LightboxProvider } from "@/components/ui/image-lightbox";

type LightboxScopeProps = {
  images: LightboxImageItem[];
  children: ReactNode;
};

/**
 * Opt-in lightbox scope — wrap only the sections where images should expand fullscreen.
 * Does not affect images outside this wrapper.
 */
export function LightboxScope({ images, children }: LightboxScopeProps) {
  return <LightboxProvider images={images}>{children}</LightboxProvider>;
}
