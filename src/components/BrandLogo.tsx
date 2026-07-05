import Image from 'next/image'

type BrandLogoProps = {
  variant?: 'compact' | 'full'
  priority?: boolean
  className?: string
}

export default function BrandLogo({ variant = 'compact', priority = false, className = '' }: BrandLogoProps) {
  if (variant === 'full') {
    return (
      <Image
        src="/njv-logo-dark.png"
        alt="NJV Accountants"
        width={1040}
        height={684}
        className={`block h-auto w-full rounded-sm bg-navy object-contain ${className}`}
        priority={priority}
      />
    )
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-navy sm:h-11 sm:w-14">
        <Image
          src="/njv-logo-mark-dark.png"
          alt=""
          width={640}
          height={455}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </span>
      <span className="font-display font-bold text-[1rem] text-white leading-[1.1] whitespace-nowrap sm:text-[1.1rem]">
        NJV Accountants
        <span className="hidden text-[0.625rem] font-body font-normal tracking-[0.15em] uppercase text-gold mt-px whitespace-nowrap sm:block">
          Accounting | Tax | Advisory
        </span>
      </span>
    </span>
  )
}
