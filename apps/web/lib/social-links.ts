import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { siteConfig } from "@/lib/site";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

const allSocialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: FaYoutube,
  },
  {
    label: "X (formerly Twitter)",
    href: siteConfig.social.twitter,
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: FaLinkedinIn,
  },
];

/** Social profiles with a configured URL — empty strings are hidden. */
export const socialLinks = allSocialLinks.filter((link) => link.href.trim().length > 0);
