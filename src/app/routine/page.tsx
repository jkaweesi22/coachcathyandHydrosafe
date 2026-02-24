import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { RoutineChecklist } from "@/components/routine/RoutineChecklist";

export const metadata: Metadata = generateSEO({
  title: "Daily Routine",
  description: "Coach Cathy's daily routine checklist. Editable. Persisted via localStorage.",
  canonical: "/routine/",
});

export default function RoutinePage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Routine", url: "/routine/" },
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
            Daily Routine
          </h1>
          <p className="text-sm text-slate-600">Your checklist. Edit, add, remove. Saved locally.</p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-6 md:py-8">
        <RoutineChecklist />
      </section>
    </>
  );
}
