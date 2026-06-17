"use client";

import { useCallback, useRef } from "react";

type ProjectVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/** Always-muted project video — play/pause only, no audio. */
export function ProjectVideo({ src, poster, className }: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const enforceMuted = useCallback(() => {
    const video = ref.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      controls
      playsInline
      muted
      preload="metadata"
      poster={poster}
      onVolumeChange={enforceMuted}
      onPlay={enforceMuted}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
  );
}
