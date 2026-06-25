import type { CardNavItem, MainNavLink, NavLink } from "@/components/layout/card-nav";
import type { SiteContact } from "@/components/layout/nav-contact-info";
import { headerNavLinks } from "@/lib/site-nav";
import { siteConfig } from "@/lib/site";

export const siteContact: SiteContact = {
  address: `${siteConfig.contact.street}, ${siteConfig.contact.city}, ${siteConfig.contact.province} ${siteConfig.contact.postalCode}`,
  charityRegistration: siteConfig.contact.charityRegistration,
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  phoneHref: siteConfig.contact.phoneHref,
  phoneAlt: siteConfig.contact.phoneAlt,
  phoneAltHref: siteConfig.contact.phoneAltHref,
};

/** Primary CTA beside the logo */
export const primaryCtas: NavLink[] = [
  { label: "Donate", href: "/donate", ariaLabel: "Make a one-time donation" },
];

/** Main navigation — top bar (in-page section links on the home page) */
export const mainNavLinks: MainNavLink[] = headerNavLinks;

/** Donor portal — utility row account menu */
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
    label: "Dashboard",
    href: "/account",
    ariaLabel: "Donor dashboard",
  },
  {
    label: "My sponsorships",
    href: "/account/sponsorships",
    ariaLabel: "View my sponsorships",
  },
  {
    label: "Donation history",
    href: "/account/donations",
    ariaLabel: "View donation history",
  },
  {
    label: "Tax receipts",
    href: "/account/tax-receipts",
    ariaLabel: "Download tax receipts",
  },
  {
    label: "Profile settings",
    href: "/account/profile",
    ariaLabel: "Manage profile settings",
  },
];

/**
 * Mega-menu — grouped site map (no duplicates with top bar or account menu).
 */
export const dropdownNavItems: CardNavItem[] = [
  {
    label: "Sponsor a Child",
    href: "/sponsor-a-child",
    bgColor: "#fef3e8",
    textColor: "#000000",
    links: [
      {
        label: "Browse children & projects",
        href: "/sponsor-a-child/browse",
        ariaLabel: "Browse children and projects",
      },
      {
        label: "How sponsorship works",
        href: "/sponsor-a-child#benefits",
        ariaLabel: "How child sponsorship works",
      },
      {
        label: "Sponsor now",
        href: "/sponsor-a-child#sponsor",
        ariaLabel: "Sponsor a child now",
      },
    ],
  },
  {
    label: "Gift Catalogue",
    href: "/gift-catalogue",
    bgColor: "#ffffff",
    textColor: "#000000",
    links: [
      {
        label: "Education supplies",
        href: "/gift-catalogue#education",
        ariaLabel: "Education supplies gifts",
      },
      {
        label: "Food & nutrition",
        href: "/gift-catalogue#food-nutrition",
        ariaLabel: "Food and nutrition gifts",
      },
      {
        label: "Water, health & more",
        href: "/gift-catalogue#water-health",
        ariaLabel: "Water and health gifts",
      },
    ],
  },
  {
    label: "Ways to Give",
    href: "/ways-to-give",
    bgColor: "#fef3e8",
    textColor: "#000000",
    links: [
      {
        label: "One-time donation",
        href: "/donate",
        ariaLabel: "One-time donation",
      },
      {
        label: "Monthly giving",
        href: "/donate",
        ariaLabel: "Monthly giving",
      },
      {
        label: "Give in kind",
        href: "/ways-to-give/in-kind",
        ariaLabel: "Offer an in-kind donation",
      },
      {
        label: "How we use donations",
        href: "/how-we-use-donations",
        ariaLabel: "How we use your donations",
      },
    ],
  },
  {
    label: "Impact & Stories",
    href: "/impact",
    bgColor: "#ffffff",
    textColor: "#000000",
    links: [
      {
        label: "Impact statistics",
        href: "/impact#statistics",
        ariaLabel: "Impact statistics",
      },
      {
        label: "Where we work",
        href: "/impact#where-we-work",
        ariaLabel: "Where we work",
      },
      {
        label: "Latest stories",
        href: "/stories",
        ariaLabel: "Latest stories and articles",
      },
    ],
  },
];
