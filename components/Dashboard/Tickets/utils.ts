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
