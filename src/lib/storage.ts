"use client";

const PREFIX = "coach-cathy";

export function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(`${PREFIX}-${key}`);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${PREFIX}-${key}`, JSON.stringify(value));
  } catch {
    // Silently fail
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`${PREFIX}-${key}`);
  } catch {
    // Silently fail
  }
}

export const STORAGE_KEYS = {
  ROUTINE: "routine",
  CALENDAR: "calendar",
  MEAL_PLAN: "meal-plan",
  TRAINING: "training",
} as const;
