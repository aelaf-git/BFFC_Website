"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { HiChevronDown } from "react-icons/hi2";
import { Heart } from "lucide-react";
import type { SiteContact } from "@/components/layout/nav-contact-info";
import { NavAccountMenu } from "@/components/layout/nav-account-menu";
import { NavSearch } from "@/components/layout/nav-search";
import { useHeroNav } from "@/components/layout/hero-nav-provider";
import { useActiveNavKey } from "@/hooks/use-active-nav";
import { drawerNavLinkClass, headerNavLinkClass } from "@/lib/nav-link-styles";
import { activeNavTargets, drawerMobileHeaderNavLinks, drawerNavLinks, navKeyFromHref } from "@/lib/site-nav";
import { HEADER_ROW_HEIGHT } from "@/lib/header";

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

const MAIN_ROW_HEIGHT = HEADER_ROW_HEIGHT;

function InternalLink({
  href,
  className,
  ariaLabel,
  children,
  ariaCurrent,
}: {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
  ariaCurrent?: "page" | undefined;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel} aria-current={ariaCurrent}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={ariaLabel} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}

function NavCardLink({ link }: { link: CardNavLink }) {
  const className =
    "inline-flex items-center gap-2 text-base text-inherit no-underline transition-opacity hover:opacity-75 md:text-lg";

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
  isActive = false,
}: {
  link: MainNavLink;
  isTransparent?: boolean;
  isActive?: boolean;
}) {
  if (!link.children?.length) {
    return (
      <div className="flex h-full self-stretch items-stretch">
        <InternalLink
          href={link.href}
          ariaLabel={link.ariaLabel}
          className={headerNavLinkClass(isActive, isTransparent)}
          ariaCurrent={isActive ? "page" : undefined}
        >
          {link.label}
        </InternalLink>
      </div>
    );
  }

  return (
    <div className="group relative flex h-full items-center">
      <button
        type="button"
        className={`inline-flex h-full items-center gap-1 whitespace-nowrap text-base font-medium transition-colors duration-300 lg:text-lg ${
          isTransparent
            ? "text-white/80 hover:text-white"
            : "text-foreground hover:text-accent"
        }`}
        aria-haspopup="true"
      >
        {link.label}
        <HiChevronDown
          className="h-4 w-4 transition-transform group-hover:rotate-180"
          aria-hidden
        />
      </button>
      <div className="invisible absolute top-full right-0 z-[200] mt-2 min-w-[280px] rounded-lg border border-border bg-background py-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 shadow-lg">
        {link.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-5 py-3 text-base text-foreground transition-colors hover:bg-accent-light hover:text-accent"
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
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const isHomePage = pathname === "/";
  const isStoryPage = pathname.startsWith("/stories/");
  const { heroThreshold: ctxHeroThreshold } = useHeroNav();

  // Every page starts transparent (navbar floats over the hero image).
  // It becomes opaque once the user scrolls past the hero area.
  const isHeroPage = true;

  useEffect(() => {
    const handleScroll = () => {
      const H = window.innerHeight;
      let threshold: number;
      if (ctxHeroThreshold !== null) {
        // Page supplied a custom threshold via <HeroNavSignal />
        threshold = ctxHeroThreshold;
      } else if (isHomePage) {
        // Homepage: full-screen three-slide carousel
        threshold = 3 * H - 80;
      } else if (isStoryPage) {
        // Blog detail hero is ~60 vh
        threshold = H * 0.55;
      } else {
        // All other pages: standard short hero banner (~256 px / h-64)
        threshold = 200;
      }
      setIsOpaque(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isStoryPage, ctxHeroThreshold]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowX = "";
    };
  }, [isExpanded]);

  const collapsedHeight = MAIN_ROW_HEIGHT;

  const createTimeline = useCallback(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return null;

    gsap.set(drawer, { x: "100%" });
    gsap.set(backdrop, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(drawer, { x: "0%", duration: 0.4, ease });

    return tl;
  }, [ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      tlRef.current.kill();
      const newTl = createTimeline();
      if (newTl) {
        if (isExpanded) newTl.progress(1);
        tlRef.current = newTl;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, createTimeline]);

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

  const showOpaque = isOpaque;
  const activeKey = useActiveNavKey(activeNavTargets);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full max-w-[100vw] transition-all duration-500 ${className}`}
    >
      {/*
        Opaque bar background lives on its OWN layer (sibling of the drawer),
        not on an ancestor. A backdrop-filter/filter on an ancestor would become
        the containing block for the fixed drawer and clip it to the thin header
        bar — making the menu vanish on scrolled (opaque) pages.
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
          showOpaque
            ? "bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 shadow-sm"
            : "bg-transparent"
        }`}
      />

      {/* Invisible ref target — pointer-events always off so it never intercepts clicks */}
      <div ref={backdropRef} className="pointer-events-none fixed inset-0" aria-hidden="true" />

      <nav
        ref={navRef}
        className="relative z-10 block w-full min-w-0 max-w-full bg-transparent"
        style={{ height: collapsedHeight }}
      >
        {/* Main row */}
        <div
          className="relative z-[2] flex h-full min-w-0 max-w-full items-center gap-2 px-3 sm:gap-3 sm:px-4 md:gap-4 md:px-6"
        >
          {/* Brand */}
          <div className="flex h-full min-w-0 shrink items-center gap-2 sm:gap-3">
            <Link href="/" className="flex h-full min-w-0 items-center gap-2 sm:gap-3" aria-label={logoAlt}>
              <Image
                src={logo}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                className="h-10 w-auto max-w-[7.5rem] object-contain object-left min-[380px]:max-w-[9.5rem] sm:h-12 sm:max-w-[11rem] md:max-w-[15rem]"
                priority
              />
              <span
                className={`hidden font-serif text-xl font-semibold tracking-tight transition-colors duration-300 2xl:block 2xl:text-3xl ${
                  showOpaque ? "text-foreground" : "text-white"
                }`}
              >
                Bright Future for Children
              </span>
            </Link>
          </div>

          {/* Primary CTAs — full-height donate block beside logo */}
          <div className="flex shrink-0 self-stretch items-stretch pl-1 sm:pl-3 md:pl-5">
            {primaryCtas.map((cta) => (
              <InternalLink
                key={cta.href}
                href={cta.href}
                ariaLabel={cta.ariaLabel}
                className="inline-flex h-full min-h-full items-center gap-2.5 rounded-none bg-accent px-6 text-sm font-bold uppercase tracking-[0.14em] text-white whitespace-nowrap shadow-sm transition-colors duration-300 hover:bg-accent-hover sm:px-8 sm:text-base"
              >
                <Heart className="h-4 w-4 shrink-0 fill-white/20 sm:h-5 sm:w-5" aria-hidden />
                {cta.label}
              </InternalLink>
            ))}
          </div>

          <div className="flex h-full min-w-0 flex-1 items-center justify-end gap-4 md:gap-6 lg:gap-8">
            <nav
              className="hidden h-full items-stretch gap-0.5 xl:flex"
              aria-label="Main navigation"
            >
              {mainNavLinks.map((link) => (
                <MainNavItem
                  key={link.href + link.label}
                  link={link}
                  isTransparent={!showOpaque}
                  isActive={navKeyFromHref(link.href) === activeKey}
                />
              ))}
            </nav>

            {/* Desktop tools row integrated directly here */}
            <div className="hidden h-full items-center gap-4 xl:flex">
              <NavSearch isTransparent={!showOpaque} />
              {/* My Account — hidden until donor portal is ready
              <NavAccountMenu
                label="My Account"
                links={accountLinks}
                isTransparent={!showOpaque}
              />
              */}
            </div>
          </div>

          {/* Right: menu (mobile/tablet) */}
          <div className="relative z-[101] ml-auto flex h-full shrink-0 items-center gap-1.5 sm:gap-2 xl:hidden">
            <button
              type="button"
              className={`flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-300 hover:bg-accent-light/80 ${
                isHamburgerOpen ? "open" : ""
              }`}
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              aria-expanded={isExpanded}
            >
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${
                  isHamburgerOpen ? "translate-y-[3px] rotate-45 bg-foreground" : showOpaque ? "bg-foreground" : "bg-white"
                }`}
              />
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${
                  isHamburgerOpen ? "-translate-y-[3px] -rotate-45 bg-foreground" : showOpaque ? "bg-foreground" : "bg-white"
                }`}
              />
            </button>
          </div>

          {/* Hamburger only (desktop - since language switcher and other tools are in the main bar) */}
          <div className="relative z-[101] hidden h-full shrink-0 items-center xl:flex">
            <button
              type="button"
              className={`flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-300 hover:bg-accent-light/80 ${
                isHamburgerOpen ? "open" : ""
              }`}
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              aria-expanded={isExpanded}
            >
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${
                  isHamburgerOpen ? "translate-y-[3px] rotate-45 bg-foreground" : showOpaque ? "bg-foreground" : "bg-white"
                }`}
              />
              <span
                className={`h-0.5 w-6 transition-all duration-300 ${
                  isHamburgerOpen ? "-translate-y-[3px] -rotate-45 bg-foreground" : showOpaque ? "bg-foreground" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right-side drawer — full width on phones, capped on larger screens */}
        <div
          ref={drawerRef}
          className={`fixed top-0 right-0 z-[100] flex h-[100dvh] w-full max-w-[min(100vw,28rem)] flex-col overflow-x-hidden overscroll-contain bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] ${
            isExpanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!isExpanded}
          style={{ transform: "translateX(100%)" }}
        >
          {/* Top bar: label + close */}
          <div className="flex shrink-0 items-center justify-between px-4 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Navigate
            </span>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Search — mobile/tablet drawer */}
          <div className="shrink-0 px-4 pb-4 sm:px-8">
            <NavSearch fullWidth placeholder="Search the site…" />
          </div>

          {/* Nav links — scrollable when content exceeds drawer height */}
          <nav
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden overscroll-contain sm:gap-5"
            aria-label="Site navigation"
          >
            {drawerMobileHeaderNavLinks.map((link) => {
              const isActive = link.key === activeKey;
              return (
                <div key={link.href} className="flex w-full shrink-0 items-stretch">
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className={`${drawerNavLinkClass(isActive)} xl:hidden`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
            {drawerNavLinks.map((link) => {
              const isActive = link.key === activeKey;
              return (
                <div key={link.href} className="flex w-full shrink-0 items-stretch">
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className={drawerNavLinkClass(isActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Bottom: social */}
          <div className="shrink-0 px-4 pb-8 pt-4 sm:px-8 sm:pb-10 sm:pt-6">
            <div className="flex items-center gap-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-zinc-600 transition-colors hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-600 transition-colors hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-600 transition-colors hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-zinc-600 transition-colors hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

