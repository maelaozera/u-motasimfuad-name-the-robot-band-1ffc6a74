import { mkdirSync, writeFileSync } from "node:fs";

// Segmen baris entry, masing-masing berlabel agar mudah diutak-atik.
interface Segment {
  label: string;
  text: string;
}

const SEGMENTS: Segment[] = [
  { label: "band", text: "The 404s" },
  { label: "separator", text: "—" },
  { label: "intro", text: "hit single" },
  { label: "song", text: "'Page Not Found (But the Bass Drops Anyway)'." },
];

// Merakit baris entry dari segmen-segmen berlabel.
function buildEntry(segments: Segment[]): string {
  return segments.map((segment) => segment.text).join(" ");
}

// Memvalidasi baris: satu baris, 1-200 karakter, bukan whitespace saja,
// tanpa spasi ganda dan tanpa spasi di ujung. Mengembalikan daftar masalah.
function validateLine(line: string): string[] {
  const problems: string[] = [];
  if (line.trim().length === 0) {
    problems.push("entry kosong atau hanya whitespace");
  }
  if (line.length < 1 || line.length > 200) {
    problems.push(`entry ${line.length} karakter, di luar batas 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("entry harus satu baris");
  }
  if (line.includes("  ")) {
    problems.push("entry mengandung spasi ganda");
  }
  if (line !== line.trim()) {
    problems.push("entry punya spasi di ujung");
  }
  return problems;
}

function run(): void {
  const entry = buildEntry(SEGMENTS);
  const problems = validateLine(entry);
  if (problems.length > 0) {
    throw new Error(`entry tidak valid: ${problems.join("; ")}`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry, "utf8");
  console.log(`entry ditulis (${entry.length} karakter): ${entry}`);
}

run();
