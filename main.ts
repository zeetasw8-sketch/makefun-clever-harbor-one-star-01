import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const dir: string = dirname(new URL(import.meta.url).pathname);
const inputPath: string = join(dir, "line.txt");
const raw: string = readFileSync(inputPath, "utf8");

function validateLine(raw: string): void {
  if (raw.trim().length === 0) throw new Error("line.txt is empty");
  if (raw.length < 1 || raw.length > 180) {
    throw new Error(`line must be 1-180 characters, got ${raw.length}`);
  }
  if (raw.includes("\n") || raw.includes("\r")) {
    throw new Error("line must be a single line");
  }
  const words: string[] = raw.trim().split(/\s+/);
  if (words.length > 25) {
    throw new Error(`line must be at most 25 words, got ${words.length}`);
  }
}

validateLine(raw);

const outDir: string =
  process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), raw, "utf8");
