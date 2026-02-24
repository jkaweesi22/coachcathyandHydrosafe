import { generateSEO, generateBreadcrumbJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import contactData from "@/data/pages/contact.json";

export const metadata: Metadata = generateSEO({
  title: "Contact",
  description: "Get in touch with Coach Cathy and HydroSafe for swimming lessons and water safety training.",
  canonical: "/contact/",
});

export default function ContactPage() {
  const breadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact/" },
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
            {contactData.content.headline}
          </h1>
          <p className="text-lg text-slate-600">{contactData.content.subheadline}</p>
        </div>
      </div>
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto grid max-w-2xl gap-4 md:grid-cols-2">
          {contactData.content.contacts.map((contact, i) => (
            <Card key={i} className="transition-all hover:shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-water-600" />
                  {contact.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={contact.href}
                  className="text-xl font-semibold text-water-600 hover:text-water-700 hover:underline"
                >
                  {contact.phone}
                </a>
                <p className="mt-2 text-sm text-slate-600">
                  Call or WhatsApp for lessons and inquiries
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
