"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type HeroNavCtx = {
  /** px scroll distance before navbar goes opaque. null = not a hero page */
  heroThreshold: number | null;
  setHeroThreshold: (v: number | null) => void;
};

const HeroNavContext = createContext<HeroNavCtx>({
  heroThreshold: null,
  setHeroThreshold: () => {},
});

export function HeroNavProvider({ children }: { children: ReactNode }) {
  const [heroThreshold, setHeroThresholdRaw] = useState<number | null>(null);

  const setHeroThreshold = useCallback((v: number | null) => {
    setHeroThresholdRaw(v);
  }, []);

  return (
    <HeroNavContext.Provider value={{ heroThreshold, setHeroThreshold }}>
      {children}
    </HeroNavContext.Provider>
  );
}

export function useHeroNav() {
  return useContext(HeroNavContext);
}

/**
 * Drop this into any page that has a full-screen hero image.
 * The navbar will start transparent and go opaque after `threshold` px of scroll.
 * Defaults to window.innerHeight (one full screen = the hero height).
 */
export function HeroNavSignal({ threshold = -1 }: { threshold?: number }) {
  const { setHeroThreshold } = useHeroNav();

  useEffect(() => {
    const t = threshold >= 0 ? threshold : window.innerHeight;
    setHeroThreshold(t);
    return () => setHeroThreshold(null);
  }, [threshold, setHeroThreshold]);

  return null;
}
