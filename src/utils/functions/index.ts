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

export function formatTimeOfFirstMessage(dateString: any): string {
  if (!dateString || dateString == null) return "";
  const date = new Date(dateString);

  if (isToday(date)) {
    return "Today";
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

export function throttle(func: Function, limit: number) {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return (...args: any[]) => {
    const now = Date.now();
    if (!lastRan || now - lastRan >= limit) {
      func(...args);
      lastRan = now;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (now - lastRan >= limit) {
          func(...args);
          lastRan = now;
        }
      }, limit - (now - lastRan));
    }
  };
}

export function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
