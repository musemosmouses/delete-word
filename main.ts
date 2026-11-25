// delete-word: one word we would erase from the dictionary for good.
// Fully deterministic, no network access: the entry is a constant
// string, written verbatim into entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen word (9 chars, a single word): the name we give to things
// we cannot name. Erase it and the fallback label for unnamed things is
// itself gone — the thingamajig has nothing left to be called by.
const WORD_TO_DELETE = "doohickey";

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 77
// characters, a single word and nothing else. Fail loudly here rather
// than shipping an invalid entry.
if (
  WORD_TO_DELETE.length < 1 ||
  WORD_TO_DELETE.length > 77 ||
  WORD_TO_DELETE.includes("\n") ||
  WORD_TO_DELETE.includes(" ")
) {
  throw new Error(
    `entry violates the 1-77 single-word gate: ${WORD_TO_DELETE.length} chars`,
  );
}
// The grader mounts its output dir at MAKEFUN_OUTPUT_DIR (/output);
// locally the same run writes to ./out. No trailing newline: the file
// holds exactly the entry, one word, 9 characters.
function run(): void {
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, "entry.txt"), WORD_TO_DELETE, "utf8");
}

run();
