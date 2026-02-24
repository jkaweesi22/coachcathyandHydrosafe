import siteConfigJson from "./site-config.json";

export interface SiteConfig {
  brand: string;
  tagline: string;
  description: string;
}

export const siteConfig: SiteConfig = siteConfigJson as SiteConfig;
