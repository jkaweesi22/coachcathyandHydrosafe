import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import homeData from "@/data/pages/home.json";

export default function HomePage() {
  const { hero, features } = homeData.sections;

  return (
    <div className="gradient-hero">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            {hero.headline}
          </h1>
          <p className="mb-6 text-lg text-slate-600">
            {hero.subheadline}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact/">{hero.cta}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about/">{hero.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/60 bg-white py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-bold text-slate-900 md:text-2xl">
              What We Offer
            </h2>
            <p className="text-slate-600">
              Expert coaching. Water safety. Championship mindset.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              return (
                <Card key={i} className="group transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-water-100 to-water-200 text-water-600 transition-colors group-hover:from-water-200 group-hover:to-water-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={feature.title === "HydroSafe" ? "/hydrosafe/" : feature.title === "Coach Cathy" ? "/about/" : "/programs/"}
                      className="inline-flex items-center text-sm font-medium text-water-600 hover:text-water-700"
                    >
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
