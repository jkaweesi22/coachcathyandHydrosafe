import Image from "next/image";
import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import aboutData from "@/data/pages/about.json";

export const metadata: Metadata = generateSEO({
  title: "About",
  description:
    aboutData.content.subheadline +
    " " +
    aboutData.content.body.slice(0, 120),
  canonical: "/about/",
});

export default function AboutPage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About", url: "/about/" },
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
            {aboutData.content.headline}
          </h1>
          <p className="text-lg text-slate-600">
            {aboutData.content.subheadline}
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
          <div className="relative shrink-0">
            <Image
              src="/images/coach-cathy.jpg"
              alt="Coach Cathy"
              width={320}
              height={400}
              className="rounded-2xl object-cover shadow-card"
              priority
            />
          </div>

          <div className="flex-1">
            <p className="text-lg leading-relaxed text-slate-700">
              {aboutData.content.body}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}