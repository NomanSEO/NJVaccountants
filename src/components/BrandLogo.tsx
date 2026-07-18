import Image from "next/image";

type BrandLogoProps = {
  variant?: "compact" | "full";
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({
  variant = "compact",
  priority = false,
  className = "",
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <Image
        src="/njv-logo-dark.png"
        alt="NJV Accountants"
        width={1040}
        height={684}
        className={`bg-navy block h-auto w-full rounded-sm object-contain ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden sm:h-11 sm:w-14">
        <Image
          src="/njv-logo-mark-transparent.png"
          alt=""
          width={640}
          height={455}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </span>
      <span className="font-display text-[1rem] leading-[1.1] font-bold whitespace-nowrap text-white sm:text-[1.1rem]">
        NJV Accountants
        <span className="font-body text-gold mt-px hidden text-[0.625rem] font-normal tracking-[0.15em] whitespace-nowrap uppercase sm:block">
          Accounting | Tax | Advisory
        </span>
      </span>
    </span>
  );
}
