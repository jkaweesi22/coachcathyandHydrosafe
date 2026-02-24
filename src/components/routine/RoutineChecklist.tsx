"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getFromStorage, setToStorage, STORAGE_KEYS } from "@/lib/storage";
import routineTemplates from "@/data/routine/templates.json";

const DEFAULT_ITEMS = routineTemplates.default as string[];

export function RoutineChecklist() {
  const [items, setItems] = useState<{ id: string; text: string; done: boolean }[]>([]);

  useEffect(() => {
    const stored = getFromStorage<{ id: string; text: string; done: boolean }[]>(
      STORAGE_KEYS.ROUTINE
    );
    if (stored?.length) {
      setItems(stored);
    } else {
      setItems(
        DEFAULT_ITEMS.map((text, i) => ({
          id: `item-${i}`,
          text,
          done: false,
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (items.length) setToStorage(STORAGE_KEYS.ROUTINE, items);
  }, [items]);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  };

  const updateText = (id: string, text: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, text } : it)));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: `item-${Date.now()}`, text: "New item", done: false },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const resetToDefault = () => {
    setItems(
      DEFAULT_ITEMS.map((text, i) => ({
        id: `item-${i}`,
        text,
        done: false,
      }))
    );
  };

  const completed = items.filter((i) => i.done).length;
  const total = items.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {completed} of {total} complete
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={addItem}>
            Add item
          </Button>
          <Button variant="outline" size="sm" onClick={resetToDefault}>
            Reset to default
          </Button>
        </div>
      </div>

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
              >
                ×
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
