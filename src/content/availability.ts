/**
 * How far a landing claim is backed by the product.
 * - live: shipped and verified against the app.
 * - soon: not shipped yet; rendered with a "Coming soon" badge.
 * - verify: not yet confirmed by the team. Shown with a badge in development
 *   and left out of production builds, so an unconfirmed claim never ships.
 */
export type Availability = "live" | "soon" | "verify";

export type WithAvailability = { availability?: Availability };

const showUnverified = process.env.NODE_ENV !== "production";

// `object` rather than WithAvailability: an all-optional type would reject items without the field.
export function published<T extends object>(items: readonly T[]): T[] {
  return items.filter((item) => showUnverified || !("availability" in item && item.availability === "verify"));
}
