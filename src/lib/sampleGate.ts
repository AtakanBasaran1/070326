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
    answers: ["15.06.2024", "15.06.24", "15 Haziran 2024"],
  },
];

export const GATE_ASK_COUNT = 1;

export function pickQuestions(): GateQuestion[] {
  return GATE_QUESTIONS;
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
    [
      "150624",
      "15062024",
      "15624",
      "1562024",
      "061524",
      "06152024",
      "61524",
      "6152024",
    ].includes(digits)
  ) {
    return true;
  }

  const folded = fold(input);
  return (
    folded === "15 haziran" ||
    folded === "15 haziran 24" ||
    folded === "15 haziran 2024" ||
    folded === "haziran 15" ||
    folded === "haziran 15 24" ||
    folded === "haziran 15 2024"
  );
}

export function isCorrectAnswer(question: GateQuestion, input: string): boolean {
  if (!input.trim()) return false;
  if (question.kind === "date") return isDatingDate(input);

  const folded = fold(input);
  return question.answers.some((answer) => fold(answer) === folded);
}
