import type { CardNavItem } from "@/components/layout/card-nav";

export const bffcNavItems: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#ea580c",
    textColor: "#ffffff",
    links: [
      { label: "Our story", href: "/#about", ariaLabel: "Read our story" },
      { label: "Mission", href: "/#mission", ariaLabel: "Our mission" },
    ],
  },
  {
    label: "Programs",
    bgColor: "#2563eb",
    textColor: "#ffffff",
    links: [
      { label: "Youth", href: "/#programs", ariaLabel: "Youth programs" },
      { label: "Community", href: "/#community", ariaLabel: "Community programs" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#f5f5f5",
    textColor: "#000000",
    links: [
      { label: "Get in touch", href: "/#contact", ariaLabel: "Contact us" },
      { label: "Support", href: "/#support", ariaLabel: "Support BFFC" },
    ],
  },
];
