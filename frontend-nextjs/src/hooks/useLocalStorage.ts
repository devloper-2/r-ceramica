/**
 * useLocalStorage.ts — Persistent client-side state backed by localStorage.
 *
 * Usage:
 *   const [lang, setLang] = useLocalStorage("rc-lang", "en");
 *
 * API is identical to useState, but the value is persisted across sessions.
 * SSR-safe: gracefully falls back to the initial value on the server.
 */

"use client";

import { useState, useEffect, useCallback } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

/**
 * @param key           localStorage key.
 * @param initialValue  Fallback value when no stored value exists.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Lazy initializer — reads from localStorage only on the client
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        // Notify other tabs / windows
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch {
        console.warn(`[useLocalStorage] Failed to set key "${key}"`);
      }
    },
    [key, storedValue]
  );

  // Sync when another tab updates the same key
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) setStoredValue(readValue());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, readValue]);

  return [storedValue, setValue];
}
