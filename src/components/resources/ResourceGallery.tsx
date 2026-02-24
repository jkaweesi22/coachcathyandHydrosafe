"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { imgPath } from "@/lib/constants";

const RESOURCE_IMAGES = [
  "/images/resource1.jpg",
  "/images/resource2.jpg",
  "/images/resource3.jpg",
  "/images/resource4.jpg",
  "/images/resource5.jpg",
  "/images/resource6.jpg",
  "/images/resource7.jpg",
];
export function ResourceGallery() {
  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    if (openImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openImage]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {RESOURCE_IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenImage(src)}
            className="flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-soft transition-all hover:shadow-card focus:outline-none focus:ring-2 focus:ring-water-500"
          >
            <Image
              src={src}
              alt={`Resource ${i + 1} - Click to enlarge`}
              width={400}
              height={300}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      {openImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenImage(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setOpenImage(null)}
          aria-label="Close"
        >
          <button
            type="button"
            onClick={() => setOpenImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={openImage}
              alt="Enlarged resource"
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto max-w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
