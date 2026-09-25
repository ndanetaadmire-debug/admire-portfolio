"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/types/content";
import { cn } from "@/lib/utils";

/** Screenshot gallery with an accessible, keyboard-driven lightbox. */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  return (
    <>
      {/* Landscape (desktop) and portrait (mobile) screens get their own grids so rows stay even. */}
      {(["landscape", "portrait"] as const).map((orientation) => {
        const items = images
          .map((img, i) => ({ img, i }))
          .filter(({ img }) => (img.orientation ?? "landscape") === orientation);
        if (!items.length) return null;
        return (
          <ul
            key={orientation}
            className={cn(
              "grid gap-4 [&+&]:mt-4",
              orientation === "portrait" ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {items.map(({ img, i }) => (
              <li key={img.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group border-line bg-surface-2 relative block w-full overflow-hidden rounded-2xl border text-left"
                  aria-label={`Enlarge: ${img.caption}`}
                >
                  <div className={cn("relative", orientation === "portrait" ? "aspect-[9/16]" : "aspect-[16/10]")}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        orientation === "portrait"
                          ? "(min-width: 640px) 280px, 50vw"
                          : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      }
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="text-muted flex items-center justify-between gap-2 px-4 py-3 text-sm">
                    {img.caption}
                    <Maximize2
                      className="size-3.5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        );
      })}

      {/* Portal to <body> so the fixed overlay always covers the viewport,
          even inside animated/transformed ancestors. */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={images[index].caption}
            className="animate-fade-in fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-md"
            onClick={() => setIndex(null)}
          >
            <div className="text-muted flex items-center justify-between px-4 py-4 text-sm sm:px-8">
              <span>
                {index + 1} / {images.length} · <span className="text-white">{images[index].caption}</span>
              </span>
              <button
                type="button"
                aria-label="Close"
                autoFocus
                className="grid size-10 place-items-center rounded-full bg-white/10"
              >
                <X className="size-5 text-white" />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="100vw"
                className="object-contain p-2 sm:p-8"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous image"
                    className="hover:bg-accent absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 ring-1 ring-white/30 backdrop-blur-md sm:left-6"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className="hover:bg-accent absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 ring-1 ring-white/30 backdrop-blur-md sm:right-6"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
