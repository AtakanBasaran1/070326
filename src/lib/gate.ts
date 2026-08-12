export type GateQuestion = {
  id: string;
  prompt: string;
  answers: string[];
  kind?: "text" | "date";
};

export const GATE_QUESTIONS: GateQuestion[] = [
  {
    id: "date",
    prompt: "Çıkma tarihimiz",
    kind: "date",
    answers: ["04.18.26"],
  },
  {
    id: "nickname",
    prompt: "Lakabımız",
    answers: ["Enik"],
  },
  {
    id: "food",
    prompt: "Her buluşmamızda yemek yemeye gittiğimiz o yer",
    answers: ["Dürümle"],
  },
  {
    id: "family",
    prompt: "Ailemle nerenin yanında tanıştın?",
    answers: ["Migros"],
  },
  {
    id: "gift-her",
    prompt: "Sana aldığım ilk hediye",
    answers: ["Hiç çıkarma kolyesi", "Kolye"],
  },
  {
    id: "gift-him",
    prompt: "Bana aldığın ilk hediye",
    answers: ["Enik anahtarlık", "Anahtarlık"],
  },
];

export const GATE_ASK_COUNT = 3;

export function pickQuestions(count = GATE_ASK_COUNT): GateQuestion[] {
  return shuffle(GATE_QUESTIONS).slice(0, count);
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function fold(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/i̇/g, "i")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/â/g, "a")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isDatingDate(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  if (
    ["041826", "04182026", "41826", "4182026", "180426", "18042026"].includes(
      digits,
    )
  ) {
    return true;
  }

  const folded = fold(input);
  return (
    folded === "18 nisan" ||
    folded === "18 nisan 26" ||
    folded === "18 nisan 2026" ||
    folded === "nisan 18" ||
    folded === "nisan 18 26" ||
    folded === "nisan 18 2026"
  );
}

export function isCorrectAnswer(question: GateQuestion, input: string): boolean {
  if (!input.trim()) return false;
  if (question.kind === "date") return isDatingDate(input);

  const folded = fold(input);
  return question.answers.some((answer) => fold(answer) === folded);
}
