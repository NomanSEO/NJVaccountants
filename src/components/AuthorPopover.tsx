"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authorPath } from "@/lib/seo";
import type { AuthorSummary } from "@/types";

export default function AuthorPopover({
  author,
  imageUrl,
  variant = "light",
}: {
  author: AuthorSummary;
  imageUrl?: string | null;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const descriptionId = useId();
  const slug = author.slug?.current;
  if (!slug) {
    return (
      <span className={variant === "dark" ? "text-white" : "text-slate"}>
        {author.name}
      </span>
    );
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          (event.currentTarget.querySelector("a") as HTMLElement | null)?.focus();
        }
      }}
    >
      <Link
        href={authorPath(slug)}
        aria-describedby={open ? descriptionId : undefined}
        className={
          variant === "dark"
            ? "hover:text-gold font-semibold text-white underline decoration-white/25 underline-offset-4 transition-colors"
            : "text-navy hover:text-gold font-semibold underline decoration-navy/20 underline-offset-4 transition-colors"
        }
      >
        {author.name}
      </Link>
      {open ? (
        <span
          id={descriptionId}
          role="tooltip"
          className="border-border absolute bottom-full left-0 z-50 mb-3 hidden w-72 rounded-sm border bg-white p-5 text-left shadow-[0_16px_48px_rgba(7,15,30,0.18)] [@media(hover:hover)]:block"
        >
          <span className="flex items-start gap-3">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={52}
                height={52}
                className="h-13 w-13 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="bg-gold/15 text-navy font-display flex h-13 w-13 shrink-0 items-center justify-center rounded-full font-bold">
                {author.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            )}
            <span>
              <span className="font-display text-navy block font-bold">
                {author.name}
              </span>
              {author.role ? (
                <span className="text-gold block text-xs font-semibold">
                  {author.role}
                </span>
              ) : null}
              {author.credentials ? (
                <span className="text-slate-light mt-1 block text-xs">
                  {author.credentials}
                </span>
              ) : null}
            </span>
          </span>
          {author.shortBio ?? author.bio ? (
            <span className="text-slate mt-3 block text-sm leading-6">
              {author.shortBio ?? author.bio}
            </span>
          ) : null}
          <span className="text-gold mt-3 block text-sm font-semibold">
            View full profile →
          </span>
        </span>
      ) : null}
    </span>
  );
}
