import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import blogPosts from "@/data/content/blog.json";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string | string[];
  publishedAt: string;
  author: string;
};

export function generateStaticParams() {
  const posts = blogPosts as BlogPost[];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (blogPosts as BlogPost[]).find((p) => p.slug === slug);
  if (!post) return {};
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    canonical: `/blog/${slug}/`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (blogPosts as BlogPost[]).find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: post.title, url: `/blog/${slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />
      <div className="gradient-hero py-8">
        <div className="container mx-auto px-4">
          <Link href="/blog/" className="mb-4 inline-block text-sm text-water-600 hover:underline">
            ← Back to Blog
          </Link>
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            {post.title}
          </h1>
          <p className="mb-1 text-slate-600">{post.excerpt}</p>
          <p className="text-xs text-slate-500">{post.publishedAt}</p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-6">
        <div className="prose prose-slate mx-auto max-w-2xl">
          {Array.isArray(post.content) ? (
            post.content.map((paragraph, i) => (
              <p key={i} className="mb-4 text-lg leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-lg leading-relaxed text-slate-700">{post.content}</p>
          )}
        </div>
        <div className="mx-auto mt-6 max-w-2xl">
          <Button asChild variant="outline">
            <Link href="/blog/">Back to Blog</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
