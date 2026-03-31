import type { Branch } from "@/data/branches";

type DaySchedule = { open: string; close: string };

/** Parse hours string like "Mon–Sun 12:00–23:00" or "Mon–Thu 12:00–23:00, Fri–Sat 12:00–00:00, Sun 12:00–22:00" */
function parseSchedule(hours: string): Record<number, DaySchedule | null> {
  // Day index: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const dayMap: Record<string, number> = {
    sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
  };

  const schedule: Record<number, DaySchedule | null> = {};
  for (let i = 0; i < 7; i++) schedule[i] = null;

  if (!hours) return schedule;

  const segments = hours.split(",").map((s) => s.trim());

  for (const seg of segments) {
    // Match patterns like "Mon–Sun 12:00–23:00" or "Fri–Sat 12:00–00:00"
    const match = seg.match(/^(\w{3})[–-](\w{3})\s+(\d{1,2}:\d{2})[–-](\d{1,2}:\d{2})$/i)
      || seg.match(/^(\w{3})\s+(\d{1,2}:\d{2})[–-](\d{1,2}:\d{2})$/i);

    if (!match) continue;

    let startDay: number, endDay: number, openTime: string, closeTime: string;

    if (match.length === 5) {
      // Range: Mon–Sun
      startDay = dayMap[match[1].toLowerCase()] ?? -1;
      endDay = dayMap[match[2].toLowerCase()] ?? -1;
      openTime = match[3];
      closeTime = match[4];
    } else {
      // Single day: Mon 12:00–23:00
      startDay = dayMap[match[1].toLowerCase()] ?? -1;
      endDay = startDay;
      openTime = match[2];
      closeTime = match[3];
    }

    if (startDay === -1) continue;

    // Expand range
    let d = startDay;
    while (true) {
      schedule[d] = { open: openTime, close: closeTime };
      if (d === endDay) break;
      d = (d + 1) % 7;
    }
  }

  return schedule;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export type OpenStatus = {
  isOpen: boolean;
  label: string; // "Open now" | "Closed"
  detail: string; // "Closes 23:00" | "Opens 12:00"
};

export function getOpenStatus(branch: Branch): OpenStatus {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/London" }));
  const dayIndex = now.getDay(); // 0=Sun
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const schedule = parseSchedule(branch.hours);
  const today = schedule[dayIndex];

  if (!today) {
    // Check next opening day
    for (let offset = 1; offset <= 7; offset++) {
      const nextDay = (dayIndex + offset) % 7;
      const nextSchedule = schedule[nextDay];
      if (nextSchedule) {
        return { isOpen: false, label: "Closed", detail: `Opens ${nextSchedule.open}` };
      }
    }
    return { isOpen: false, label: "Closed", detail: "" };
  }

  const openMin = timeToMinutes(today.open);
  let closeMin = timeToMinutes(today.close);

  // Handle midnight closing (00:00 means next day midnight)
  if (closeMin === 0) closeMin = 24 * 60;
  // Handle close time earlier than open (crosses midnight)
  if (closeMin <= openMin) closeMin += 24 * 60;

  if (currentMinutes >= openMin && currentMinutes < closeMin) {
    const closeDisplay = today.close === "00:00" ? "00:00" : today.close;
    return { isOpen: true, label: "Open now", detail: `Closes ${closeDisplay}` };
  }

  if (currentMinutes < openMin) {
    return { isOpen: false, label: "Closed", detail: `Opens ${today.open}` };
  }

  // Past closing - check tomorrow
  const tomorrow = (dayIndex + 1) % 7;
  const tomorrowSchedule = schedule[tomorrow];
  if (tomorrowSchedule) {
    return { isOpen: false, label: "Closed", detail: `Opens ${tomorrowSchedule.open}` };
  }

  return { isOpen: false, label: "Closed", detail: "" };
}
