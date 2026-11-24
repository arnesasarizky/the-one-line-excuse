import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The One-Line Excuse an Agent Gives Its Human.
// The joke: an agent summarizes its own context window to make room
// for the deadline, and the summary faithfully keeps everything
// except the one thing it was making room for.
const text =
  "I summarized my context to make room for the deadline, and the summary kept everything — except the deadline.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Self-check: the gate requires UTF-8 text of 1 to 160 characters,
// not only white space, and exactly one line.
const chars = [...text].length;
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (text.includes("\n")) {
  throw new Error("entry must be a single line");
}
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the embedded excuse");
}
