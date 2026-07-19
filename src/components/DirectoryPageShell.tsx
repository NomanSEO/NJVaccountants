import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface DirectoryPageShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export default function DirectoryPageShell({
  eyebrow,
  title,
  intro,
  children,
}: DirectoryPageShellProps) {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-18">
            <Link
              href="/"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold"
            >
              ← Back to Home
            </Link>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75" />
              {eyebrow}
            </div>
            <h1 className="font-display max-w-220 text-[clamp(2.25rem,5vw,3.75rem)] leading-tight font-bold text-white">
              {title}
            </h1>
            <p className="mt-7 max-w-190 text-lg leading-8 text-white/65">
              {intro}
            </p>
          </div>
        </section>
        <div className="from-gold via-gold-light to-gold h-1 bg-linear-to-r" />
        {children}
      </main>
      <Footer />
    </>
  );
}
