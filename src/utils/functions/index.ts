import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
} from "date-fns";

export function formatLastMessageTime(dateString: any): string {
  if (!dateString || dateString == null) return "";
  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  if (isThisWeek(date)) {
    return format(date, "EEEE"); // e.g., "Monday"
  }
  if (isThisYear(date)) {
    return format(date, "MMM d"); // e.g., "Oct 31"
  }
  return format(date, "MMM d, yyyy"); // e.g., "Oct 31, 2024"
}
