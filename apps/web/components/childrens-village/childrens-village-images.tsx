"use client";

import {
  academyGalleryImages,
  academyLightboxIndex,
  academyUrgentImage,
} from "@/lib/academy-assets";
import { LightboxImage } from "@/components/ui/image-lightbox";

export function ChildrensVillageUrgentImage() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-200">
      <LightboxImage
        index={academyLightboxIndex.urgent}
        src={academyUrgentImage.src}
        alt={academyUrgentImage.alt}
        sizes="(max-width: 1024px) 100vw, 50vw"
        wrapperClassName="h-full w-full"
      />
    </div>
  );
}

export function ChildrensVillageGallery() {
  return (
    <div className="border-t border-zinc-100 bg-white">
      <div className="container mx-auto px-6 py-20 sm:px-10 lg:px-20">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
            The Campus Vision
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light text-zinc-500">
            Architectural renderings of the modern 10,000 sqm campus — dormitories, classrooms,
            dining halls, sports facilities, and gardens. Click any image to view fullscreen.
          </p>
        </div>
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {academyGalleryImages.map((image, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={image.src}
                className={`h-full overflow-hidden rounded-2xl bg-zinc-100 ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <LightboxImage
                  index={academyLightboxIndex.galleryStart + index}
                  src={image.src}
                  alt={image.alt}
                  priority={isFeatured}
                  wrapperClassName={
                    isFeatured
                      ? "aspect-[16/10] h-full w-full lg:aspect-auto lg:min-h-full"
                      : "aspect-[4/3] w-full"
                  }
                  sizes={
                    isFeatured
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
