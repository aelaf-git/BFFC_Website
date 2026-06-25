"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SiteNavItem } from "@/lib/site-nav";
import { HEADER_ROW_HEIGHT } from "@/lib/header";

const HEADER_OFFSET = HEADER_ROW_HEIGHT;
const SCROLL_ANCHOR_OFFSET = 24;

type SectionBounds = {
  key: string;
  top: number;
  bottom: number;
};

function matchPathname(pathname: string, targetPath?: string): boolean {
  if (!targetPath) return false;
  if (targetPath === "/stories") {
    return pathname === "/stories" || pathname.startsWith("/stories/");
  }
  if (targetPath === "/projects") {
    return pathname === "/projects" || pathname === "/childrens-village";
  }
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

function resolvePageActiveKey(pathname: string, targets: SiteNavItem[]): string | null {
  const match = targets.find((target) => matchPathname(pathname, target.pathname));
  return match?.key ?? null;
}

function getDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getSectionBounds(target: SiteNavItem): SectionBounds | null {
  const marker = document.getElementById(target.sectionId!);
  if (!marker) return null;

  const section = marker.closest("section") ?? marker.parentElement ?? marker;
  const top = getDocumentTop(marker);
  const bottom = getDocumentTop(section) + section.getBoundingClientRect().height;

  return { key: target.key, top, bottom };
}

function resolveHomeScrollKey(targets: SiteNavItem[]): string | null {
  const anchor = window.scrollY + HEADER_OFFSET + SCROLL_ANCHOR_OFFSET;

  const sections = targets
    .filter((target) => target.sectionId)
    .map(getSectionBounds)
    .filter((entry): entry is SectionBounds => entry !== null)
    .sort((a, b) => a.top - b.top);

  if (!sections.length) return null;

  const active = sections.find(
    (section) => anchor >= section.top && anchor < section.bottom,
  );

  return active?.key ?? null;
}

function resolveHashKey(targets: SiteNavItem[]): string | null {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return null;
  const match = targets.find((target) => target.sectionId === hash);
  return match?.key ?? null;
}

export function useActiveNavKey(targets: SiteNavItem[]) {
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      if (pathname === "/") {
        setActiveKey(resolveHomeScrollKey(targets));
        return;
      }
      setActiveKey(resolvePageActiveKey(pathname, targets));
    };

    const onHashChange = () => {
      if (pathname !== "/") return;
      const hashKey = resolveHashKey(targets);
      if (hashKey) setActiveKey(hashKey);
    };

    update();

    if (pathname === "/" && window.location.hash) {
      const hashKey = resolveHashKey(targets);
      if (hashKey) setActiveKey(hashKey);
    }

    const onScroll = () => {
      if (pathname === "/") {
        setActiveKey(resolveHomeScrollKey(targets));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname, targets]);

  return activeKey;
}
