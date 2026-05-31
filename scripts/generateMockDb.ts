/**
 * Generates db.json for json-server.
 * Uses @faker-js/faker to produce realistic seed data that matches
 * the API response shapes expected by RTK Query endpoints.
 *
 * Usage:  npx tsx scripts/generateMockDb.ts
 * Output: db.json (gitignored)
 *
 * Keep domain shapes in sync with src/shared/types/*.
 */

import { Faker, ru } from "@faker-js/faker";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// ---------------------------------------------------------------------------
// Domain types — mirrors src/shared/types/*
// ---------------------------------------------------------------------------

const faker = new Faker({ locale: ru });
interface Researcher {
  id: number;
  name: string;
  patronymic: string;
  surname: string;
  email: string;
  password_hash: string;
  role: string;
  job: string;
  phone: string;
  researches_id: number[];
}

interface Research {
  id: number;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  researchers_id: number[];
  status: "Активно" | "Прекращено";
}

interface PredictionRow {
  headers: string[];
  rows: number[][];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RESEARCHER_COUNT = 15;
const RESEARCH_COUNT = 12;

const JOBS = [
  "Ботаник",
  "Эколог",
  "Агроном",
  "Селекционер",
  "Фитопатолог",
  "Биохимик",
  "Генетик",
  "Почвовед",
] as const;

const GOALS = [
  "Изучение устойчивости сортов к заморозкам",
  "Анализ урожайности при разных режимах полива",
  "Селекция сортов с повышенной сахаристостью",
  "Оценка влияния удобрений на рост",
  "Мониторинг фитопатогенов в регионе",
  "Сравнительный анализ сортов по лежкости плодов",
  "Изучение адаптации к засушливому климату",
  "Генетический анализ популяций дикорастущих видов",
] as const;

const PREDICTION_CLASSIFIERS = [
  "Феникс Уральское",
  "Сувенир Алтая",
  "Подарок садоводам",
  "Заветное",
  "Бычье сердце",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pickRandom<T>(arr: readonly T[]): T {
  return arr[faker.number.int({ min: 0, max: arr.length - 1 })];
}

function pickSubset<T>(arr: readonly T[], min: number, max: number): T[] {
  const count = faker.number.int({ min, max: Math.min(max, arr.length) });
  return faker.helpers.shuffle([...arr]).slice(0, count);
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

function generateResearcher(id: number, researchIds: number[]): Researcher {
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  return {
    id,
    name,
    patronymic: faker.person.middleName(),
    surname,
    email: faker.internet.email({ firstName: name, lastName: surname }),
    password_hash: faker.internet.password({ length: 16 }),
    role: faker.helpers.arrayElement(["admin", "user", "moderator"]),
    job: pickRandom(JOBS),
    phone: faker.phone.number({ style: "international" }),
    researches_id: pickSubset(researchIds, 1, 4),
  };
}

function generateResearch(id: number, researcherIds: number[]): Research {
  const start = faker.date.between({ from: "2023-01-01", to: "2026-05-01" });
  const end = new Date(start);
  end.setMonth(end.getMonth() + faker.number.int({ min: 1, max: 12 }));

  return {
    id,
    title: `${pickRandom(GOALS)}`,
    goal: pickRandom(GOALS),
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
    researchers_id: pickSubset(researcherIds, 1, 3),
    status: faker.helpers.arrayElement(["Активно", "Прекращено"]),
  };
}

function generatePredictions(
  researchIds: number[],
): Record<number, PredictionRow> {
  const result: Record<number, PredictionRow> = {};
  for (const id of researchIds) {
    const rowCount = faker.number.int({ min: 5, max: 20 });
    const rows: number[][] = Array.from({ length: rowCount }, () =>
      PREDICTION_CLASSIFIERS.map(() =>
        faker.number.float({ min: 0, max: 1, fractionDigits: 4 }),
      ),
    );
    result[id] = { headers: PREDICTION_CLASSIFIERS, rows };
  }
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const researchIds = Array.from({ length: RESEARCH_COUNT }, (_, i) => i + 1);
  const researcherIds = Array.from(
    { length: RESEARCHER_COUNT },
    (_, i) => i + 1,
  );

  const researchers = researcherIds.map((id) =>
    generateResearcher(id, researchIds),
  );
  const researches = researchIds.map((id) =>
    generateResearch(id, researcherIds),
  );
  const predictions = generatePredictions(researchIds);

  const db = {
    researchers: researchers,
    researches: researches,
    predictions,
  };

  const outPath = resolve("D:/projects/EcoData/frontend/src/test", "db.json");
  writeFileSync(outPath, JSON.stringify(db, null, 2), "utf-8");

  console.log(
    `✅ db.json written (${researchers.length} researchers, ${researches.length} researches, ${Object.keys(predictions).length} prediction sets)`,
  );
}

main();
