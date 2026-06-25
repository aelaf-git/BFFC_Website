import type { MainNavLink } from "@/components/layout/card-nav";

export type SiteNavItem = {
  key: string;
  label: string;
  href: string;
  ariaLabel: string;
  /** Homepage section id for scroll highlighting */
  sectionId?: string;
  /** Route prefix for page-level highlighting (e.g. /stories matches /stories/foo) */
  pathname?: string;
};

/** Desktop header — in-page anchors on the home page */
export const headerNavLinks: MainNavLink[] = [
  { label: "About Us", href: "/#about", ariaLabel: "About us" },
  { label: "What We Do", href: "/#what-we-do", ariaLabel: "What we do" },
  { label: "Get in Touch", href: "/#get-in-touch", ariaLabel: "Get in touch" },
];

/** Shown in the hamburger below xl, where the header bar links are hidden */
export const drawerMobileHeaderNavLinks: SiteNavItem[] = [
  {
    key: "about",
    label: "About Us",
    href: "/#about",
    ariaLabel: "About us",
    sectionId: "about",
  },
  {
    key: "what-we-do",
    label: "What We Do",
    href: "/#what-we-do",
    ariaLabel: "What we do",
    sectionId: "what-we-do",
  },
  {
    key: "get-in-touch",
    label: "Get in Touch",
    href: "/#get-in-touch",
    ariaLabel: "Get in touch",
    sectionId: "get-in-touch",
  },
];

export const drawerNavLinks: SiteNavItem[] = [
  {
    key: "projects",
    label: "Projects",
    href: "/projects",
    ariaLabel: "Projects",
    sectionId: "childrens-village",
    pathname: "/projects",
  },
  {
    key: "ways-to-give",
    label: "Ways to Give",
    href: "/ways-to-give",
    ariaLabel: "Ways to give",
    pathname: "/ways-to-give",
  },
  {
    key: "shop-gifts",
    label: "Shop Gifts",
    href: "/shop-gifts",
    ariaLabel: "Shop gifts",
    pathname: "/shop-gifts",
  },
  {
    key: "stories",
    label: "Stories",
    href: "/stories",
    ariaLabel: "Stories",
    sectionId: "stories",
    pathname: "/stories",
  },
  {
    key: "resources",
    label: "Resources",
    href: "/resources",
    ariaLabel: "Resources",
    pathname: "/resources",
  },
  {
    key: "faqs",
    label: "FAQs",
    href: "/faqs",
    ariaLabel: "FAQs",
    pathname: "/faqs",
  },
];

/** Scroll-spy + route targets for header and drawer */
export const activeNavTargets: SiteNavItem[] = [
  {
    key: "about",
    label: "About Us",
    href: "/#about",
    ariaLabel: "About us",
    sectionId: "about",
  },
  {
    key: "what-we-do",
    label: "What We Do",
    href: "/#what-we-do",
    ariaLabel: "What we do",
    sectionId: "what-we-do",
  },
  {
    key: "projects",
    label: "Projects",
    href: "/projects",
    ariaLabel: "Projects",
    sectionId: "childrens-village",
    pathname: "/projects",
  },
  {
    key: "stories",
    label: "Stories",
    href: "/stories",
    ariaLabel: "Stories",
    sectionId: "stories",
    pathname: "/stories",
  },
  {
    key: "get-in-touch",
    label: "Get in Touch",
    href: "/#get-in-touch",
    ariaLabel: "Get in touch",
    sectionId: "get-in-touch",
  },
  {
    key: "ways-to-give",
    label: "Ways to Give",
    href: "/ways-to-give",
    ariaLabel: "Ways to give",
    pathname: "/ways-to-give",
  },
  {
    key: "shop-gifts",
    label: "Shop Gifts",
    href: "/shop-gifts",
    ariaLabel: "Shop gifts",
    pathname: "/shop-gifts",
  },
  {
    key: "resources",
    label: "Resources",
    href: "/resources",
    ariaLabel: "Resources",
    pathname: "/resources",
  },
  {
    key: "faqs",
    label: "FAQs",
    href: "/faqs",
    ariaLabel: "Faqs",
    pathname: "/faqs",
  },
];

export function navKeyFromHref(href: string): string | null {
  if (href === "/#about") return "about";
  if (href === "/#what-we-do") return "what-we-do";
  if (href === "/#get-in-touch") return "get-in-touch";
  const item = drawerNavLinks.find((link) => link.href === href);
  return item?.key ?? null;
}
