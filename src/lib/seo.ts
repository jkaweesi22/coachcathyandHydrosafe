import type { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SITE_URL = "https://jkaweesi22.github.io/coachcathyandHydrosafe";
const DEFAULT_OG = "/og-default.png";

export function generateSEO(config: SEOConfig): Metadata {
  const { title, description, canonical, ogImage, noIndex } = config;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const image = ogImage ? `${SITE_URL}${ogImage}` : `${SITE_URL}${DEFAULT_OG}`;

  return {
    title: title.includes("|") ? title : `${title} | Coach Cathy & HydroSafe`,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url,
      siteName: "Coach Cathy & HydroSafe",
      images: [{ url: image, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
): string {
  const listItems = items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  });
}
