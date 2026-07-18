"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

interface GrecaptchaApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ): number;
  reset(widgetId?: number): void;
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaApi;
  }
}

export default function RecaptchaCheckbox({
  siteKey,
  onToken,
  resetSignal,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  resetSignal: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<number | null>(null);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.grecaptcha || widgetRef.current !== null) {
      return;
    }
    widgetRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [onToken, siteKey]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  useEffect(() => {
    if (widgetRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetRef.current);
      onToken("");
    }
  }, [onToken, resetSignal]);

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className="min-h-19" />
    </>
  );
}
