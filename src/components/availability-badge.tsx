import type { Availability } from "@/content/availability";
import { ko } from "@/content/ko";

export function AvailabilityBadge({ availability }: { availability?: Availability }) {
  if (!availability || availability === "live") return null;
  return <span className={`badge badge-${availability}`}>{ko.badges[availability]}</span>;
}
