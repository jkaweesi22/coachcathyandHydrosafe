import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceGallery } from "@/components/resources/ResourceGallery";
import resources from "@/data/content/resources.json";

export const metadata: Metadata = generateSEO({
  title: "Resources",
  description: "Guides and resources for swimming and water safety.",
  canonical: "/resources/",
});

export default function ResourcesPage() {
  const items = resources as { slug: string; title: string; excerpt: string; type: string }[];

  return (
    <div className="gradient-hero py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Resources
          </h1>
          <p className="text-sm text-slate-600">Guides and helpful materials</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link key={item.slug} href={`/resources/${item.slug}/`}>
              <Card className="h-full transition-all hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.excerpt}</CardDescription>
                  <span className="text-xs text-water-600">{item.type}</span>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Gallery</h2>
          <p className="mb-4 text-sm text-slate-600">Click any image to enlarge and read the content.</p>
          <ResourceGallery />
        </div>
      </div>
    </div>
  );
}
