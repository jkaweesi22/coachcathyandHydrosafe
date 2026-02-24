"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/data/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/hydrosafe/", label: "HydroSafe" },
  { href: "/programs/", label: "Programs" },
  { href: "/blog/", label: "Blog" },
  { href: "/resources/", label: "Resources" },
  { href: "/calendar/", label: "Calendar" },
  { href: "/routine/", label: "Routine" },
  { href: "/meal-plan/", label: "Meal Plan" },
  { href: "/training/", label: "Training" },
  { href: "/contact/", label: "Contact" },
];

export function Header({ siteConfig }: { siteConfig: SiteConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-slate-900 transition-opacity hover:opacity-90"
        >
          <span className="bg-gradient-to-r from-water-600 to-water-500 bg-clip-text text-xl font-bold text-transparent">
            {siteConfig.brand}
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-water-50 hover:text-water-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="default">
            <Link href="/contact/">Get Started</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="container mx-auto flex flex-col gap-0 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-water-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
