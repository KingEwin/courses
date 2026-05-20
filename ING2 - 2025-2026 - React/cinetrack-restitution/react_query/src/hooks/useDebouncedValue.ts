"use client";

import { useEffect, useState } from "react";

// Returns a value that lags `delay` ms behind the input.
// React Query handles cache and dedup, but UX-side debouncing
// (waiting for the user to stop typing) is not its responsibility.
export function useDebouncedValue<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
