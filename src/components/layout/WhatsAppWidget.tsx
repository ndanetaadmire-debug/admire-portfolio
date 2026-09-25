"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { site } from "@/content/site";
import { cn, whatsappLink } from "@/lib/utils";

/**
 * Floating chat launcher (pattern adapted from app.gerko.io):
 * a bubble that opens a small chat card and hands off to WhatsApp.
 */
export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);

  // Show a one-time nudge after a short delay (per session).
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("wa-hint") === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setHint(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const dismissHint = () => {
    setHint(false);
    try {
      sessionStorage.setItem("wa-hint", "1");
    } catch {}
  };

  // The wrapper ignores taps; only the visible bubble (and the open chat card) receive them.
  // Without this, the invisible closed card blocked taps on the page underneath on phones.
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <div
        role="dialog"
        aria-label="Chat with Admire on WhatsApp"
        aria-hidden={!open}
        className={cn(
          "border-line bg-surface w-[min(20rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300",
          open ? "pointer-events-auto visible scale-100 opacity-100" : "invisible scale-90 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
          <div className="relative">
            <Image src="/images/admire.webp" alt="" width={40} height={40} className="rounded-full object-cover" />
            <span className="bg-green absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-[#075e54]" />
          </div>
          <div className="flex-1 text-sm">
            <p className="font-semibold">{site.shortName}</p>
            <p className="text-xs text-white/75">Typically replies within a few hours</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            <X className="size-4 text-white/80" />
          </button>
        </div>
        <div className="space-y-3 bg-[#0b141a] p-4">
          <p className="bg-surface-3 max-w-[85%] rounded-xl rounded-tl-none px-3 py-2 text-sm leading-relaxed">
            Hi 👋 Thanks for stopping by! Hiring for a full-stack role or need help with a project? Send me a message.
          </p>
          <a
            href={whatsappLink(site.whatsapp, "Hi Admire, I saw your portfolio and would like to chat.")}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
          >
            <Send className="size-4" aria-hidden /> Start chat
          </a>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        {hint && !open && (
          <button
            type="button"
            onClick={() => {
              dismissHint();
              setOpen(true);
            }}
            className="animate-page-in border-line bg-surface text-muted hidden rounded-full border px-4 py-2 text-xs shadow-lg sm:block"
          >
            Questions? Chat with me
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            dismissHint();
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-5px_rgb(37_211_102/0.6)] transition-transform hover:scale-105"
        >
          {!open && (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/25 [animation-duration:3s] [animation-iteration-count:3]"
              aria-hidden
            />
          )}
          {open ? <X className="relative size-6" /> : <BrandIcon name="whatsapp" className="relative size-7" />}
        </button>
      </div>
    </div>
  );
}
