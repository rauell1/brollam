#!/usr/bin/env node
/**
 * House style: no em dashes (U+2014) or en dashes (U+2013) anywhere in the
 * source. Use a colon, a comma, or a full stop instead; for numeric ranges
 * write "to".
 *
 * Runs as part of `npm run lint`.
 *
 * The banned characters are built with String.fromCharCode rather than typed
 * as literals, so this file never trips its own check.
 *
 * CMS-authored copy lives in Neon and is not covered here, so keep the same
 * rule in mind when writing in the admin.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src", "scripts"];
const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".json"];
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build"]);

const EM_DASH = String.fromCharCode(0x2014);
const EN_DASH = String.fromCharCode(0x2013);
const BANNED = new RegExp("[" + EM_DASH + EN_DASH + "]");

/** @type {{file: string, line: number, text: string, char: string}[]} */
const findings = [];

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!EXTENSIONS.some((ext) => entry.endsWith(ext))) continue;

    const lines = readFileSync(full, "utf8").split(/\r?\n/);
    lines.forEach((text, i) => {
      const match = text.match(BANNED);
      if (!match) return;
      findings.push({
        file: relative(ROOT, full),
        line: i + 1,
        text: text.trim().slice(0, 120),
        char: match[0] === EM_DASH ? "em dash" : "en dash",
      });
    });
  }
}

for (const dir of SCAN_DIRS) walk(join(ROOT, dir));

if (findings.length > 0) {
  console.error(`\nFound ${findings.length} banned dash character(s):\n`);
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  (${f.char})`);
    console.error(`    ${f.text}\n`);
  }
  console.error('Replace with a colon, comma or full stop. Use "to" for ranges.\n');
  process.exit(1);
}

console.log("No em or en dashes found.");
