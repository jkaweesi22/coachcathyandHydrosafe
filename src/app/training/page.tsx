import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import trainingData from "@/data/training/activities.json";
import { TrainingCalendar } from "@/components/training/TrainingCalendar";

export const metadata: Metadata = generateSEO({
  title: "Training",
  description: "Swim training structure. Warm-up, technique, main set, cool-down.",
  canonical: "/training/",
});

export default function TrainingPage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Training", url: "/training/" },
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
            Training
          </h1>
          <p className="text-sm text-slate-600">
            Structure your sessions. Warm-up → Technique → Main → Cool-down
          </p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid gap-4 md:grid-cols-2">
          {(trainingData as { id: string; name: string; duration: string; description: string }[]).map(
            (activity) => (
              <Card key={activity.id} className="transition-all hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-water-100 text-water-600">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{activity.name}</CardTitle>
                      <CardDescription className="text-water-600 font-medium">
                        {activity.duration}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{activity.description}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Daily Training Log
          </h2>
          <TrainingCalendar />
        </div>
      </section>
    </>
  );
}
