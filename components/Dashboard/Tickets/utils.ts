export function formatTehranTimeHM(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("fa-IR", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "--:--";
  }
}

// Full Jalali (Shamsi) date with time in Tehran timezone, Persian locale
export function formatTehranDateTimeShamsi(iso: string) {
  try {
    const d = new Date(iso);
    const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return fmt.format(d);
  } catch {
    return iso ?? "";
  }
}

export function statusText(s: string) {
  switch (s) {
    case "open":
      return "باز";
    case "pending":
      return "در انتظار";
    case "closed":
      return "بسته";
    default:
      return s;
  }
}
