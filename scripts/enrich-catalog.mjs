import fs from "node:fs/promises";
import path from "node:path";
import { normalizeEntry, parseCatalogYaml } from "./catalog-schema.mjs";

const catalogDir = path.resolve("catalog");
const listPath = path.resolve("list.txt");
const outputPath = path.resolve("src/data/catalog.generated.json");
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const strict = process.env.STRICT_GITHUB === "1";

async function listEntryFiles() {
  try {
    const names = await fs.readdir(catalogDir);
    return names
      .filter((name) => name.endsWith(".yaml") || name.endsWith(".yml"))
      .sort()
      .map((name) => path.join(catalogDir, name));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function readEntry(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const sourcePath = path.relative(process.cwd(), filePath).split(path.sep).join("/");
  return normalizeEntry(parseCatalogYaml(raw), sourcePath);
}

function repoFromGitHubUrl(value) {
  try {
    const url = new URL(value);
    if (url.hostname !== "github.com") return "";
    const [owner, repo] = url.pathname.replace(/^\/|\/$/g, "").split("/");
    return owner && repo ? `${owner}/${repo.replace(/\.git$/, "")}`.toLowerCase() : "";
  } catch {
    const shorthand = value.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
    return shorthand ? `${shorthand[1]}/${shorthand[2]}`.toLowerCase() : "";
  }
}

async function activeListSources() {
  const raw = await fs.readFile(listPath, "utf8");
  const repos = new Set();
  const urls = new Set();

  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    for (const column of line.split("\t").map((value) => value.trim()).filter(Boolean)) {
      const repo = repoFromGitHubUrl(column);
      if (repo) repos.add(repo);
      try {
        urls.add(new URL(column).href);
      } catch {
        // Education-level labels and other non-URL columns do not identify entries.
      }
    }
  }

  return { repos, urls };
}

function isActiveEntry(entry, activeSources) {
  if (entry.repo && activeSources.repos.has(entry.repo.toLowerCase())) return true;
  return [entry.homepage, entry.launchUrl]
    .filter(Boolean)
    .some((value) => {
      try {
        return activeSources.urls.has(new URL(value).href);
      } catch {
        return false;
      }
    });
}

async function fetchRepo(repo) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "github-catalog-platform"
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${repo}`);
  }
  return response.json();
}

async function enrich(entry) {
  if (!entry.repo) {
    return {
      ...entry,
      stars: 0,
      forks: 0,
      lastPushedAt: "",
      repoUrl: entry.homepage || entry.launchUrl || "",
      avatarUrl: ""
    };
  }

  try {
    const repo = await fetchRepo(entry.repo);
    return {
      ...entry,
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      lastPushedAt: repo.pushed_at ?? "",
      repoUrl: repo.html_url ?? `https://github.com/${entry.repo}`,
      avatarUrl: repo.owner?.avatar_url ?? ""
    };
  } catch (error) {
    if (strict) {
      throw new Error(`Repository metadata check failed for ${entry.repo}: ${error.message}`);
    }
    console.warn(`Using fallback metadata for ${entry.repo}: ${error.message}`);
    return {
      ...entry,
      stars: 0,
      forks: 0,
      lastPushedAt: "",
      repoUrl: `https://github.com/${entry.repo}`,
      avatarUrl: ""
    };
  }
}

const activeSources = await activeListSources();
const allEntries = await Promise.all((await listEntryFiles()).map(readEntry));
const entries = allEntries.filter((entry) => isActiveEntry(entry, activeSources));
const disabledCount = allEntries.length - entries.length;
if (disabledCount > 0) {
  console.log(`Excluded ${disabledCount} catalog entr${disabledCount === 1 ? "y" : "ies"} disabled in list.txt.`);
}
const enriched = await Promise.all(entries.map(enrich));

enriched.sort((a, b) => a.name.localeCompare(b.name, "en"));

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(enriched, null, 2)}\n`);
console.log(`Wrote ${enriched.length} enriched catalog entr${enriched.length === 1 ? "y" : "ies"} to ${outputPath}.`);
