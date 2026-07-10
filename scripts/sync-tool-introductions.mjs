import fs from "node:fs/promises";
import path from "node:path";
import { normalizeEntry, parseCatalogYaml, stringifyCatalogYaml } from "./catalog-schema.mjs";

const introductionDir = path.resolve("tool_introduction");
const catalogDir = path.resolve("catalog");

const sectionKeys = {
  "簡短描述": "description",
  "教育工作者摘要": "educatorSummary",
  "教學用途": "useCases",
  "導入注意": "cautions",
  "啟動或安裝方式": "install"
};

const listSections = new Set(["useCases", "cautions"]);

async function listIntroductionFiles() {
  try {
    const names = await fs.readdir(introductionDir);
    return names
      .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
      .sort()
      .map((name) => path.join(introductionDir, name));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function splitFrontmatter(raw, filePath) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filePath}: missing YAML frontmatter`);
  }
  return {
    metadata: parseCatalogYaml(match[1]),
    body: match[2]
  };
}

function parseSections(body) {
  const sections = new Map();
  let heading = "";
  let buffer = [];

  function flush() {
    if (heading) sections.set(heading, buffer.join("\n").trim());
    buffer = [];
  }

  for (const line of body.split("\n")) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      flush();
      heading = match[1];
    } else if (heading) {
      buffer.push(line);
    }
  }
  flush();

  return sections;
}

function parseListSection(value, heading, filePath) {
  const items = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^-\s+(.+)$/);
      if (!match) throw new Error(`${filePath}: "${heading}" must use Markdown bullet items`);
      return match[1].trim();
    });

  return items;
}

async function readIntroduction(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const { metadata, body } = splitFrontmatter(raw, path.relative(process.cwd(), filePath));
  const sections = parseSections(body);
  const entry = { ...metadata };
  const relativePath = path.relative(process.cwd(), filePath);

  for (const [heading, key] of Object.entries(sectionKeys)) {
    const value = sections.get(heading);
    if (!value) throw new Error(`${relativePath}: missing section "${heading}"`);
    entry[key] = listSections.has(key) ? parseListSection(value, heading, relativePath) : value;
  }

  return normalizeEntry(entry, relativePath);
}

await fs.mkdir(catalogDir, { recursive: true });
const files = await listIntroductionFiles();

for (const filePath of files) {
  const entry = await readIntroduction(filePath);
  const targetPath = path.join(catalogDir, `${path.basename(filePath, ".md")}.yaml`);
  await fs.writeFile(targetPath, stringifyCatalogYaml(entry));
  console.log(`Synced ${path.relative(process.cwd(), filePath)} -> ${path.relative(process.cwd(), targetPath)}`);
}

if (files.length === 0) {
  console.warn("No tool introduction Markdown files found.");
}
