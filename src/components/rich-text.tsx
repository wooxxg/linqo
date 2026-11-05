import type { Rich } from "@/content/ko";

/**
 * Renders inline rich text. `hlClass` styles highlighted terms; corrected terms
 * render both the wrong and right word stacked so the hero can swap them.
 */
export function RichText({ value, hlClass = "hl" }: { value: Rich; hlClass?: string }) {
  return value.map((segment, i) => {
    if (typeof segment === "string") return segment;
    if ("hl" in segment) {
      return (
        <mark key={i} className={hlClass}>
          {segment.hl}
        </mark>
      );
    }
    const [wrong, right] = segment.fix;
    return (
      <span key={i} className="fix">
        <span className="fix-wrong">{wrong}</span>
        <span className="fix-right">{right}</span>
      </span>
    );
  });
}
