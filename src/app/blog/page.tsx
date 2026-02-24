import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import blogPosts from "@/data/content/blog.json";

export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: "Articles and tips from Coach Cathy on swimming and water safety.",
  canonical: "/blog/",
});

export default function BlogPage() {
  const posts = blogPosts as { slug: string; title: string; excerpt: string; publishedAt: string }[];

  return (
    <div className="gradient-hero py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Blog
          </h1>
          <p className="text-sm text-slate-600">Tips and insights from Coach Cathy</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`}>
              <Card className="h-full transition-all hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                  <p className="text-xs text-slate-500">{post.publishedAt}</p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
