import { whatsappUrl } from "@/config/site";

export default function WhatsAppWidget() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact NJV Accountants on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-900 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 focus:ring-3 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#25D366] focus:outline-none sm:right-6 sm:bottom-6 sm:h-15 sm:w-15"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-current"
      >
        <path d="M16.02 3A12.84 12.84 0 0 0 5.07 22.55L3 30l7.65-2a12.94 12.94 0 0 0 5.37 1.17A13.08 13.08 0 0 0 29 16.08 13 13 0 0 0 16.02 3Zm0 23.97a10.7 10.7 0 0 1-5.14-1.31l-.37-.22-4.54 1.19 1.21-4.42-.24-.38a10.69 10.69 0 1 1 9.08 5.14Zm5.87-8.02c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.72.16-.21.32-.83 1.05-1.02 1.27-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.58-1.6a9.63 9.63 0 0 1-1.79-2.23c-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.22.06-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.63-.53-.55-.72-.56h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67s1.15 3.09 1.31 3.3c.16.22 2.25 3.45 5.46 4.84.76.33 1.36.52 1.82.67.77.24 1.46.21 2.01.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
