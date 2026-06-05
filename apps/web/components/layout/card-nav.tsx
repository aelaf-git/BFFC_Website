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
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
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

  const createTimeline = useCallback(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return null;

    gsap.set(drawer, { x: "100%" });
    gsap.set(backdrop, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(backdrop, { opacity: 1, duration: 0.25, ease: "none" });
    tl.to(drawer, { x: "0%", duration: 0.35, ease }, "-=0.25");

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

  const showOpaque = isOpaque || !isHeroPage;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full overflow-visible transition-all duration-500 border-b ${
        showOpaque
          ? "bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 border-border/40 shadow-sm"
          : "bg-transparent border-transparent shadow-none"
      } ${className}`}
    >
      {/* Invisible click-away area — no dark overlay */}
      <div
        ref={backdropRef}
        className={`fixed inset-0 z-[99] ${isExpanded ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden="true"
        onClick={toggleMenu}
        style={{ opacity: 0 }}
      />

      <nav
        ref={navRef}
        className="relative z-10 block w-full bg-transparent"
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

        {/* Right-side drawer */}
        <div
          ref={drawerRef}
          className={`fixed top-0 right-0 z-[100] flex h-screen w-72 flex-col bg-white shadow-2xl ${
            isExpanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!isExpanded}
          style={{ transform: "translateX(100%)" }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
            <span className="font-serif text-base font-semibold text-zinc-900">Menu</span>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-zinc-100 px-5 py-3">
            <NavSearch className="w-full" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-2" aria-label="Site navigation">
            {[
              { label: "Our Work", href: "/#what-we-do" },
              { label: "Ways to Give", href: "/ways-to-give" },
              { label: "Stories", href: "/stories" },
              { label: "Resources", href: "/resources" },
              { label: "FAQs", href: "/faqs" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="border-b border-zinc-100 py-4 text-sm font-medium text-zinc-700 transition-colors hover:text-primary last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher at bottom */}
          <div className="border-t border-zinc-100 px-5 py-4">
            <NavLanguageSwitcher />
          </div>
        </div>
      </nav>
    </div>
  );
}

