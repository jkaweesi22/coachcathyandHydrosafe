"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getFromStorage, setToStorage, STORAGE_KEYS } from "@/lib/storage";
import trainingActivities from "@/data/training/activities.json";

const DEFAULT_TRAINING_ITEMS = (trainingActivities as { name: string }[]).map((a) => a.name);

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

type DayData = { items: TodoItem[] };
type CalendarData = Record<string, DayData>;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getDaysInMonth(year: number, month: number) {
  if (month === 1 && year % 4 === 0) return 29;
  return DAYS_IN_MONTH[month];
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getYesterdayKey(year: number, month: number, day: number): string | null {
  if (day > 1) return formatDateKey(year, month, day - 1);
  if (month > 0) return formatDateKey(year, month - 1, getDaysInMonth(year, month - 1));
  return formatDateKey(year - 1, 11, 31);
}

function createDefaultItems(): TodoItem[] {
  return DEFAULT_TRAINING_ITEMS.map((text, i) => ({
    id: `default-${i}`,
    text,
    done: false,
  }));
}

export function TrainingCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [data, setData] = useState<CalendarData>({});

  const dateKey = formatDateKey(year, month, selectedDay);
  const dayData = data[dateKey];
  const items = dayData?.items ?? createDefaultItems();

  useEffect(() => {
    const stored = getFromStorage<CalendarData>(STORAGE_KEYS.TRAINING);
    setData(stored ?? {});
  }, []);

  useEffect(() => {
    setToStorage(STORAGE_KEYS.TRAINING, data);
  }, [data]);

  const saveItems = (newItems: TodoItem[]) => {
    setData((prev) => ({
      ...prev,
      [dateKey]: { items: newItems },
    }));
  };

  const toggle = (id: string) => {
    const next = items.map((it) =>
      it.id === id ? { ...it, done: !it.done } : it
    );
    saveItems(next);
  };

  const updateText = (id: string, text: string) => {
    const next = items.map((it) => (it.id === id ? { ...it, text } : it));
    saveItems(next);
  };

  const addItem = () => {
    saveItems([
      ...items,
      { id: `item-${Date.now()}`, text: "New item", done: false },
    ]);
  };

  const removeItem = (id: string) => {
    saveItems(items.filter((it) => it.id !== id));
  };

  const copyFromYesterday = () => {
    const [y, m, d] = dateKey.split("-").map(Number);
    const yesterday = getYesterdayKey(y, m - 1, d);
    if (yesterday && data[yesterday]) {
      saveItems(
        data[yesterday].items.map((it, i) => ({
          ...it,
          id: `item-${Date.now()}-${i}`,
          done: false,
        }))
      );
    }
  };

  const resetDay = () => {
    setData((prev) => {
      const next = { ...prev };
      delete next[dateKey];
      return next;
    });
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `training-${year}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(reader.result as string) as CalendarData;
            setData(parsed);
          } catch {
            alert("Invalid JSON file");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const completed = items.filter((i) => i.done).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (month === 0) {
                setMonth(11);
                setYear((y) => y - 1);
              } else setMonth((m) => m - 1);
            }}
          >
            ← Prev
          </Button>
          <h2 className="min-w-[180px] text-xl font-bold">
            {MONTHS[month]} {year}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (month === 11) {
                setMonth(0);
                setYear((y) => y + 1);
              } else setMonth((m) => m + 1);
            }}
          >
            Next →
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={exportData}>
            Export
          </Button>
          <Button variant="secondary" size="sm" onClick={importData}>
            Import
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-slate-600">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const key = formatDateKey(year, month, day);
            const dayItems = data[key]?.items ?? [];
            const dayCompleted = dayItems.filter((i) => i.done).length;
            const dayTotal = dayItems.length || DEFAULT_TRAINING_ITEMS.length;
            const isSelected = day === selectedDay;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center rounded-xl p-2 text-sm transition-colors ${
                  isSelected
                    ? "bg-water-500 text-white ring-2 ring-water-600"
                    : "hover:bg-water-50"
                }`}
              >
                <span className="font-medium">{day}</span>
                {dayTotal > 0 && (
                  <span className={`text-xs ${isSelected ? "text-white/90" : "text-slate-500"}`}>
                    {dayCompleted}/{dayTotal}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900">
            {MONTHS[month]} {selectedDay}, {year}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={addItem}>
              Add item
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyFromYesterday}
              title="Copy yesterday's list"
            >
              Copy from yesterday
            </Button>
            <Button variant="ghost" size="sm" onClick={resetDay} className="text-slate-500">
              Reset to default
            </Button>
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-600">
          {completed} of {items.length} complete
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-water-50/30"
              >
                <Checkbox
                  checked={item.done}
                  onChange={() => toggle(item.id)}
                  className="shrink-0"
                />
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => updateText(item.id, e.target.value)}
                  className={`flex-1 rounded-lg border-0 bg-transparent text-sm focus:ring-2 focus:ring-water-400 ${
                    item.done ? "line-through text-slate-500" : "text-slate-800"
                  }`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-slate-400 hover:text-red-500"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
