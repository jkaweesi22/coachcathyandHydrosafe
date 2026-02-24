import Link from "next/link";
import { Phone } from "lucide-react";
import type { SiteConfig } from "@/data/site-config";

const footerLinks = [
  { href: "/about/", label: "About" },
  { href: "/hydrosafe/", label: "HydroSafe" },
  { href: "/programs/", label: "Programs" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {siteConfig.brand}
            </h3>
            <p className="text-sm text-slate-600">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Coach Cathy</h3>
            <a
              href="tel:+256700127331"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-water-600"
            >
              <Phone className="h-4 w-4" />
              +256 700 127331
            </a>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">HydroSafe</h3>
            <a
              href="tel:+256700127331"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-water-600"
            >
              <Phone className="h-4 w-4" />
              +256 700 127331
            </a>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-water-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
