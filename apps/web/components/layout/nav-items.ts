import type { CardNavItem, MainNavLink, NavLink } from "@/components/layout/card-nav";
import type { SiteContact } from "@/components/layout/nav-contact-info";
import { siteConfig } from "@/lib/site";

export const siteContact: SiteContact = {
  address: siteConfig.contact.address,
  charityRegistration: siteConfig.contact.charityRegistration,
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  phoneHref: siteConfig.contact.phoneHref,
};

/** Primary CTA beside the logo */
export const primaryCtas: NavLink[] = [
  { label: "Donate", href: "/donate", ariaLabel: "Make a donation" },
];

/** Main navigation — center / right of the bar */
export const mainNavLinks: MainNavLink[] = [
  { label: "About Us", href: "/about", ariaLabel: "About us" },
  {
    label: "What We Do",
    href: "/what-we-do",
    ariaLabel: "What we do",
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    ariaLabel: "Get involved",
  },
];

/** Donor portal utility links */
export const accountLinks: NavLink[] = [
  {
    label: "Sign in",
    href: "/account/sign-in",
    ariaLabel: "Sign in to donor portal",
  },
  {
    label: "Create account",
    href: "/account/register",
    ariaLabel: "Create donor account",
  },
  {
    label: "My donations",
    href: "/account/donations",
    ariaLabel: "View my donations",
  },
];

/** Mega-menu groups — opened via menu button on the right */
export const dropdownNavItems: CardNavItem[] = [
  {
    label: "About Us",
    bgColor: "#ffffff",
    textColor: "#000000",
    links: [
      { label: "Our story", href: "/about#story", ariaLabel: "Our story" },
      { label: "Our team", href: "/about#team", ariaLabel: "Our team" },
      { label: "Governance", href: "/about#governance", ariaLabel: "Governance" },
    ],
  },
  {
    label: "What We Do",
    bgColor: "#fff0e6",
    textColor: "#000000",
    links: [
      { label: "Programs", href: "/what-we-do#programs", ariaLabel: "Our programs" },
      { label: "Impact", href: "/what-we-do#impact", ariaLabel: "Our impact" },
      { label: "Where we work", href: "/what-we-do#locations", ariaLabel: "Where we work" },
    ],
  },
  {
    label: "Get Involved",
    bgColor: "#ffffff",
    textColor: "#000000",
    links: [
      {
        label: "Create a Donor Account",
        href: "/account/register",
        ariaLabel: "Create a donor account",
      },
      { label: "Volunteer", href: "/get-involved#volunteer", ariaLabel: "Volunteer" },
      { label: "Partner with us", href: "/get-involved#partner", ariaLabel: "Partner with us" },
    ],
  },
];
