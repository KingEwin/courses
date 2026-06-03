"use client";

import { useEffect, useState } from "react";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * Live HH:MM clock with a DS-style blinking colon (on every even second).
 * Colon uses `visibility: hidden` rather than removal to avoid layout shift.
 */
export function Clock({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return <span className={className}>--:--</span>;
  }

  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const colonOn = now.getSeconds() % 2 === 0;

  return (
    <span className={className}>
      {hh}
      <span style={{ visibility: colonOn ? "visible" : "hidden" }}>:</span>
      {mm}
    </span>
  );
}
