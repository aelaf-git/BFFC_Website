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
  { label: "Donate", href: "/donate", ariaLabel: "Make a one-time donation" },
];

/** Main navigation — top bar (in-page section links on the home page) */
export const mainNavLinks: MainNavLink[] = [
  { label: "About Us", href: "/#about", ariaLabel: "About us" },
  { label: "What We Do", href: "/#what-we-do", ariaLabel: "What we do" },
  { label: "Get Involved", href: "/#get-involved", ariaLabel: "Get involved" },
];

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
    bgColor: "#fef3e8",
    textColor: "#000000",
    links: [
      {
        label: "Overview",
        href: "/sponsor-a-child",
        ariaLabel: "Child sponsorship overview",
      },
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
    bgColor: "#ffffff",
    textColor: "#000000",
    links: [
      {
        label: "Shop all gifts",
        href: "/gift-catalogue",
        ariaLabel: "Browse gift catalogue",
      },
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
      {
        label: "Example: school kit",
        href: "/gift-catalogue/school-kit",
        ariaLabel: "School kit gift",
      },
    ],
  },
  {
    label: "Ways to Give",
    bgColor: "#fef3e8",
    textColor: "#000000",
    links: [
      {
        label: "All ways to give",
        href: "/ways-to-give",
        ariaLabel: "Explore ways to give",
      },
      {
        label: "One-time donation",
        href: "/donate",
        ariaLabel: "One-time donation",
      },
      {
        label: "Monthly giving",
        href: "/ways-to-give#monthly",
        ariaLabel: "Monthly giving",
      },
      {
        label: "Emergency relief & campaigns",
        href: "/ways-to-give#emergency",
        ariaLabel: "Emergency relief and current campaigns",
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
    bgColor: "#ffffff",
    textColor: "#000000",
    links: [
      {
        label: "See our impact",
        href: "/impact",
        ariaLabel: "See our impact",
      },
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
