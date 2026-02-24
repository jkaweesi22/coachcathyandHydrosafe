import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ResourceGallery } from "@/components/resources/ResourceGallery";
import resources from "@/data/content/resources.json";

type Resource = { slug: string; title: string; excerpt: string; type: string };

export function generateStaticParams() {
  const items = resources as Resource[];
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = (resources as Resource[]).find((r) => r.slug === slug);
  if (!item) return {};
  return generateSEO({
    title: item.title,
    description: item.excerpt,
    canonical: `/resources/${slug}/`,
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = (resources as Resource[]).find((r) => r.slug === slug);
  if (!item) notFound();

  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources/" },
    { name: item.title, url: `/resources/${slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />
      <div className="gradient-hero py-8">
        <div className="container mx-auto px-4">
          <Link href="/resources/" className="mb-4 inline-block text-sm text-water-600 hover:underline">
            ← Back to Resources
          </Link>
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            {item.title}
          </h1>
          <p className="text-slate-600">{item.excerpt}</p>
          <span className="text-sm text-water-600">{item.type}</span>
        </div>
      </div>
      <section className="container mx-auto px-4 py-6">
        <div className="prose prose-slate mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-slate-700">
            Content for this resource is coming soon. Check back for updates.
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-2xl">
          <Button asChild variant="outline">
            <Link href="/resources/">Back to Resources</Link>
          </Button>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Gallery</h2>
          <p className="mb-4 text-sm text-slate-600">Click any image to enlarge and read the content.</p>
          <ResourceGallery />
        </div>
      </section>
    </>
  );
}
