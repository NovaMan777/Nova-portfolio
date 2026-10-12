import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";

const FONT_CHECKS = [
  "300 16px Outfit",
  "400 16px Outfit",
  "500 16px Outfit",
  "600 16px Outfit",
  "700 16px Outfit",
  "800 16px Outfit",
  '400 48px "Instrument Serif"',
  'italic 400 48px "Instrument Serif"',
  '400 13px "IBM Plex Mono"',
  '500 13px "IBM Plex Mono"',
  '600 13px "IBM Plex Mono"',
];

export async function preloadFonts() {
  if (typeof document === "undefined" || !document.fonts) return;

  await Promise.all(
    FONT_CHECKS.map((spec) => document.fonts.load(spec).catch(() => null))
  );
  await document.fonts.ready;
}
