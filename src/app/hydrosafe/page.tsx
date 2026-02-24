import Image from "next/image";
import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import hydrosafeData from "@/data/pages/hydrosafe.json";

export const metadata: Metadata = generateSEO({
  title: "HydroSafe",
  description: hydrosafeData.content.subheadline + " " + hydrosafeData.content.body.slice(0, 120),
  canonical: "/hydrosafe/",
});

export default function HydroSafePage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "HydroSafe", url: "/hydrosafe/" },
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
            {hydrosafeData.content.headline}
          </h1>
          <p className="text-lg text-slate-600">{hydrosafeData.content.subheadline}</p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
          <div className="relative shrink-0">
            <Image
              src="/images/hydrosafe-logo.jpg"
              alt="HydroSafe logo"
              width={280}
              height={200}
              className="rounded-2xl object-contain shadow-card"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-slate-700">
              {hydrosafeData.content.body}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
