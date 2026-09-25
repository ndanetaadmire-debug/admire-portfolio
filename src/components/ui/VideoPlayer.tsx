"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-play video with a cover image.
 * Nothing heavy loads until the visitor presses play — the page stays fast,
 * and visitors see a designed cover instead of a black box.
 * Works with an mp4 in /public or a YouTube / Vimeo embed URL.
 */
export function VideoPlayer({
  src,
  poster,
  portrait,
  title,
  subtitle,
  className,
}: {
  src: string;
  poster?: string;
  /** Used for a designed cover when no poster image is set (shown in full colour). */
  portrait?: StaticImageData;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const isEmbed = /youtube|youtu\.be|vimeo/.test(src);

  return (
    <div
      className={cn(
        "border-line bg-surface relative aspect-video overflow-hidden rounded-3xl border shadow-[0_40px_80px_-40px_rgb(37_99_235/0.5)]",
        className,
      )}
    >
      {playing ? (
        isEmbed ? (
          <iframe
            src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <video src={src} controls autoPlay playsInline className="size-full bg-black object-contain">
            <track kind="captions" />
          </video>
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 block size-full text-left"
        >
          {poster ? (
            <Image src={poster} alt="" fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
          ) : portrait ? (
            // Portrait cover: blurred colour backdrop + sharp colour portrait on the right
            <div className="absolute inset-0 overflow-hidden bg-[#0b1020]">
              <Image
                src={portrait}
                alt=""
                fill
                sizes="400px"
                className="scale-125 object-cover opacity-50 blur-2xl saturate-150"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgb(37_99_235/0.45),transparent_60%)]" />
              <div className="absolute inset-y-0 right-0 aspect-square h-full [mask-image:linear-gradient(to_right,transparent,#000_35%)]">
                <Image
                  src={portrait}
                  alt="Admire Ndaneta"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 520px, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ) : (
            // Designed fallback cover until a poster image is supplied
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(37_99_235/0.45),transparent_55%),radial-gradient(circle_at_80%_90%,rgb(138_43_226/0.35),transparent_50%)]">
              <div className="bg-grid absolute inset-0 opacity-70" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

          <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 sm:size-24">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/10 [animation-duration:2.5s] [animation-iteration-count:3]" />
            <span className="bg-accent grid size-10 place-items-center rounded-full shadow-[0_0_40px_rgb(37_99_235/0.8)] sm:size-16">
              <Play className="ml-0.5 size-4 fill-white text-white sm:ml-1 sm:size-6" aria-hidden />
            </span>
          </span>

          <span className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
            <span className="block text-base font-semibold text-white sm:text-2xl">{title}</span>
            {subtitle && <span className="mt-1 hidden text-sm text-white/75 sm:block">{subtitle}</span>}
          </span>
        </button>
      )}
    </div>
  );
}
