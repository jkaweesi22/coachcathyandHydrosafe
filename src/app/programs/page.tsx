import Link from "next/link";
import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import programsData from "@/data/pages/programs.json";

export const metadata: Metadata = generateSEO({
  title: "Programs",
  description: programsData.content.subheadline,
  canonical: "/programs/",
});

export default function ProgramsPage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />
      <div className="gradient-hero py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl">
            {programsData.content.headline}
          </h1>
          <p className="text-lg text-slate-600">{programsData.content.subheadline}</p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programsData.content.programs.map((program, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/contact/"
                  className="text-sm font-medium text-water-600 hover:text-water-700"
                >
                  Enquire now →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
