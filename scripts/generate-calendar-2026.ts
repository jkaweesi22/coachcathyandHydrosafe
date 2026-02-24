/**
 * Calendar 2026 dataset generator
 * Run: npx ts-node scripts/generate-calendar-2026.ts
 * Or use the pre-generated data in src/data/calendar/2026.json
 */

const year = 2026;

interface DayData {
  date: string;
  completed: boolean;
  notes: string;
}

const days: DayData[] = [];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

for (let m = 1; m <= 12; m++) {
  const maxDay = daysInMonth[m - 1];
  for (let d = 1; d <= maxDay; d++) {
    days.push({
      date: `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      completed: false,
      notes: "",
    });
  }
}

const output = {
  year,
  totalDays: days.length,
  days,
};

console.log(JSON.stringify(output, null, 2));
