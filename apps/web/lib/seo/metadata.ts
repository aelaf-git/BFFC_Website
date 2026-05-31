import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
};

export function buildPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
  noIndex = false,
  ogImage,
}: PageMetadataOptions = {}): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteConfig.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const imageUrl = ogImage ?? `${siteConfig.url}/og-default.jpg`;
  const socialTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  return {
    // Subpages: segment uses layout title template. Home: full title without duplicating template.
    title: title ? title : { absolute: siteConfig.title },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "nonprofit",
  icons: {
    icon: [{ url: brand.icon.src, sizes: "32x32", type: "image/png" }],
    apple: "/apple-icon.png",
    shortcut: brand.icon.src,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
