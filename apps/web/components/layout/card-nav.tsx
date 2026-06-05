"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { HiChevronDown } from "react-icons/hi2";
import type { SiteContact } from "@/components/layout/nav-contact-info";
import { NavAccountMenu } from "@/components/layout/nav-account-menu";
import { NavLanguageSwitcher } from "@/components/layout/nav-language-switcher";
import { NavSearch } from "@/components/layout/nav-search";
import { useHeroNav } from "@/components/layout/hero-nav-provider";

export type NavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type MainNavLink = NavLink & {
  children?: NavLink[];
};

export type CardNavLink = NavLink;

export type CardNavItem = {
  label: string;
  /** If set, the card title becomes a clickable link to this href */
  href?: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export type CardNavProps = {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contact: SiteContact;
  primaryCtas: NavLink[];
  mainNavLinks: MainNavLink[];
  accountLinks: NavLink[];
  items: CardNavItem[];
  className?: string;
  ease?: string;
};

const MAIN_ROW_HEIGHT = 64;

function InternalLink({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

function NavCardLink({ link }: { link: CardNavLink }) {
  const className =
    "inline-flex items-center gap-[6px] text-[15px] text-inherit no-underline transition-opacity hover:opacity-75 md:text-[16px]";

  return (
    <InternalLink href={link.href} className={className} ariaLabel={link.ariaLabel}>
      <GoArrowUpRight className="shrink-0" aria-hidden />
      {link.label}
    </InternalLink>
  );
}

function MainNavItem({
  link,
  isTransparent = false,
}: {
  link: MainNavLink;
  isTransparent?: boolean;
}) {
  if (!link.children?.length) {
    return (
      <InternalLink
        href={link.href}
        ariaLabel={link.ariaLabel}
        className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
          isTransparent
            ? "text-white/80 hover:text-white"
            : "text-foreground hover:text-primary"
        }`}
      >
        {link.label}
      </InternalLink>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
          isTransparent
            ? "text-white/80 hover:text-white"
            : "text-foreground hover:text-primary"
        }`}
        aria-haspopup="true"
      >
        {link.label}
        <HiChevronDown
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
          aria-hidden
        />
      </button>
      <div className="invisible absolute top-full right-0 z-[200] mt-2 min-w-[240px] rounded-lg border border-border bg-background py-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 shadow-lg">
        {link.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-primary-light hover:text-primary"
            aria-label={child.ariaLabel}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CardNav({
  logo,
  logoAlt,
  logoWidth,
  logoHeight,
  contact,
  primaryCtas,
  mainNavLinks,
  accountLinks,
  items,
  className = "",
  ease = "power3.out",
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const isHomePage = pathname === "/";
  const isStoryPage = pathname.startsWith("/stories/");
  const { heroThreshold: ctxHeroThreshold } = useHeroNav();

  // A page is a "hero page" if it's the homepage, a story page, OR if it
  // registered a custom hero threshold via <HeroNavSignal />.
  const isHeroPage = isHomePage || isStoryPage || ctxHeroThreshold !== null;

  useEffect(() => {
    if (!isHeroPage) {
      setIsOpaque(true);
      return;
    }

    const handleScroll = () => {
      const H = window.innerHeight;
      let threshold: number;
      if (ctxHeroThreshold !== null) {
        // Custom threshold set by a page (e.g. not-found, future hero pages)
        threshold = ctxHeroThreshold;
      } else if (isStoryPage) {
        // Blog detail hero is ~60vh — go opaque just before the hero ends
        threshold = H * 0.55;
      } else {
        // Homepage: three-slide carousel
        threshold = 3 * H - 80;
      }
      setIsOpaque(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage, isHomePage, isStoryPage, ctxHeroThreshold]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const collapsedHeight = MAIN_ROW_HEIGHT;

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 320;

    const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
    if (!contentEl) return 320;

    const wasVisible = contentEl.style.visibility;
    const wasPointerEvents = contentEl.style.pointerEvents;
    const wasPosition = contentEl.style.position;
    const wasHeight = contentEl.style.height;

    contentEl.style.visibility = "visible";
    contentEl.style.pointerEvents = "auto";
    contentEl.style.position = "static";
    contentEl.style.height = "auto";
    void contentEl.offsetHeight;

    const padding = 16;
    const contentHeight = contentEl.scrollHeight;
    const currentWindowHeight = window.innerHeight || 800;
    const maxHeight = currentWindowHeight - collapsedHeight - 40;

    contentEl.style.visibility = wasVisible;
    contentEl.style.pointerEvents = wasPointerEvents;
    contentEl.style.position = wasPosition;
    contentEl.style.height = wasHeight;

    const targetContentHeight = Math.max(0, Math.min(contentHeight, maxHeight));
    return collapsedHeight + targetContentHeight + padding;
  }, [collapsedHeight]);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: collapsedHeight });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    );

    return tl;
  }, [calculateHeight, collapsedHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, calculateHeight, createTimeline]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const showOpaque = isOpaque || isExpanded || !isHeroPage;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full overflow-visible transition-all duration-500 border-b ${
        isExpanded
          ? "bg-white border-border shadow-sm"
          : showOpaque
            ? "bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 border-border/40 shadow-sm"
            : "bg-transparent border-transparent shadow-none"
      } ${className}`}
    >
      <nav
        ref={navRef}
        className={`relative z-10 block w-full will-change-[height] bg-transparent ${
          isExpanded ? "open" : ""
        }`}
        style={{ height: collapsedHeight }}
      >
        {/* Main row */}
        <div
          className="relative z-[2] flex items-center gap-3 px-4 sm:gap-4 sm:px-6"
          style={{ height: MAIN_ROW_HEIGHT }}
        >
          {/* Brand */}
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="flex items-center gap-3" aria-label={logoAlt}>
              <Image
                src={logo}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                className="h-8 w-auto max-w-[10rem] object-contain object-left sm:h-11 sm:max-w-[14rem]"
                priority
              />
              <span
                className={`hidden font-serif text-lg font-semibold tracking-tight transition-colors duration-300 2xl:block 2xl:text-2xl ${
                  showOpaque ? "text-foreground" : "text-white"
                }`}
              >
                Bright Future for Children
              </span>
            </Link>
          </div>

          {/* Primary CTAs — golden orange, beside logo */}
          <div className="flex shrink-0 items-center gap-3 pl-3 sm:pl-4 md:gap-4 lg:gap-5 lg:pl-5">
            {primaryCtas.map((cta) => (
              <InternalLink
                key={cta.href}
                href={cta.href}
                ariaLabel={cta.ariaLabel}
                className={`inline-flex h-8 items-center rounded-lg bg-primary px-2 text-[10px] font-semibold whitespace-nowrap text-white transition-all duration-300 hover:bg-primary-hover sm:h-9 sm:px-4 sm:text-sm shadow-sm ${
                  !showOpaque ? "border border-white/20 hover:border-white/40" : ""
                }`}
              >
                {cta.label}
              </InternalLink>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-4 md:gap-6 lg:gap-8">
            <nav
              className="hidden items-center gap-5 xl:flex xl:gap-7"
              aria-label="Main navigation"
            >
              {mainNavLinks.map((link) => (
                <MainNavItem
                  key={link.href + link.label}
                  link={link}
                  isTransparent={!showOpaque}
                />
              ))}
            </nav>

            {/* Desktop tools row integrated directly here */}
            <div className="hidden items-center gap-4 xl:flex">
              <NavSearch isTransparent={!showOpaque} />
              <NavLanguageSwitcher isTransparent={!showOpaque} />
              {/* My Account — hidden until donor portal is ready
              <NavAccountMenu
                label="My Account"
                links={accountLinks}
                isTransparent={!showOpaque}
              />
              */}
            </div>
          </div>

          {/* Right: language + menu dropdown (mobile/tablet) */}
          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <NavLanguageSwitcher className="sm:hidden" isTransparent={!showOpaque} />
            <button
              type="button"
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-300 hover:bg-primary-light/10 ${
                isHamburgerOpen ? "open" : ""
              }`}
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              aria-expanded={isExpanded}
            >
              <span
                className={`h-0.5 w-5 transition-all duration-300 ${
                  isHamburgerOpen ? "translate-y-[3px] rotate-45" : ""
                } ${showOpaque ? "bg-foreground" : "bg-white"}`}
              />
              <span
                className={`h-0.5 w-5 transition-all duration-300 ${
                  isHamburgerOpen ? "-translate-y-[3px] -rotate-45" : ""
                } ${showOpaque ? "bg-foreground" : "bg-white"}`}
              />
            </button>
          </div>

          {/* Hamburger only (desktop - since language switcher and other tools are in the main bar) */}
          <div className="hidden shrink-0 items-center xl:flex">
            <button
              type="button"
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-300 hover:bg-primary-light/10 ${
                isHamburgerOpen ? "open" : ""
              }`}
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              aria-expanded={isExpanded}
            >
              <span
                className={`h-0.5 w-5 transition-all duration-300 ${
                  isHamburgerOpen ? "translate-y-[3px] rotate-45" : ""
                } ${showOpaque ? "bg-foreground" : "bg-white"}`}
              />
              <span
                className={`h-0.5 w-5 transition-all duration-300 ${
                  isHamburgerOpen ? "-translate-y-[3px] -rotate-45" : ""
                } ${showOpaque ? "bg-foreground" : "bg-white"}`}
              />
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        <div
          className={`card-nav-content absolute right-0 bottom-0 left-0 z-[1] bg-white p-4 sm:px-6 overflow-y-auto ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          }`}
          style={{
            top: MAIN_ROW_HEIGHT,
            maxHeight: `calc(100vh - ${MAIN_ROW_HEIGHT}px - 40px)`,
          }}
          aria-hidden={!isExpanded}
        >
          <div className="mb-4 flex flex-col gap-4 pb-4 md:hidden">
            <NavSearch className="w-full max-w-sm" />
            <NavLanguageSwitcher />
            {/* My Account — hidden until donor portal is ready
            <NavAccountMenu label="My Account (Donor Portal)" links={accountLinks} />
            */}
            <nav className="grid gap-2 pt-3" aria-label="Page sections">
              {mainNavLinks.map((link) => (
                <InternalLink
                  key={link.href}
                  href={link.href}
                  ariaLabel={link.ariaLabel}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </InternalLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            {items.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                ref={setCardRef(idx)}
                className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block border-l-2 border-primary pl-3 text-lg font-semibold transition-colors hover:text-primary"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="border-l-2 border-primary pl-3 text-lg font-semibold">
                    {item.label}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {item.links.map((lnk, i) => (
                    <NavCardLink key={`${lnk.label}-${i}`} link={lnk} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

