import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import mealPlanData from "@/data/nutrition/meal-plan.json";
import { MealPlanGrid } from "@/components/meal-plan/MealPlanGrid";

export const metadata: Metadata = generateSEO({
  title: "Meal Plan",
  description: mealPlanData.description,
  canonical: "/meal-plan/",
});

export default function MealPlanPage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Meal Plan", url: "/meal-plan/" },
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
            {mealPlanData.title}
          </h1>
          <p className="text-sm text-slate-600">
            Track your meals daily. Pick a date, check off what you ate. All data stored locally.
          </p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-6 md:py-8">
        <MealPlanGrid />
      </section>
    </>
  );
}
