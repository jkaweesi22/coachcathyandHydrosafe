import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";

export const metadata: Metadata = generateSEO({
  title: "Calendar",
  description: "Track your daily progress. Mark days complete, add notes, export and import your data.",
  canonical: "/calendar/",
});

export default function CalendarPage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Calendar", url: "/calendar/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />
      <div className="gradient-hero py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Calendar
          </h1>
          <p className="text-sm text-slate-600">
            Your daily todo list. Pick a date, add items, check them off. All data stored locally.
          </p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-6 md:py-8">
        <CalendarGrid />
      </section>
    </>
  );
}
