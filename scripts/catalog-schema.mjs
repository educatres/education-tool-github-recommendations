const requiredFields = [
  "name",
  "description",
  "educatorSummary",
  "authorName",
  "authorGitHub",
  "repo",
  "homepage",
  "launchUrl",
  "tags",
  "educationLevels",
  "useCases",
  "cautions",
  "language",
  "install",
  "license",
  "submittedAt"
];

export function parseCatalogYaml(raw) {
  const entry = {};
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/);
    if (!match) {
      throw new Error(`unsupported YAML syntax at line ${index + 1}`);
    }

    const [, key, rawValue = ""] = match;
    const value = rawValue.trim();

    if (value === "|") {
      const block = [];
      while (index + 1 < lines.length && /^  /.test(lines[index + 1])) {
        index += 1;
        block.push(lines[index].slice(2));
      }
      entry[key] = block.join("\n").trimEnd();
      continue;
    }

    if (value === "") {
      if (index + 1 < lines.length && /^  - /.test(lines[index + 1])) {
        const items = [];
        while (index + 1 < lines.length && /^  - /.test(lines[index + 1])) {
          index += 1;
          items.push(unquote(lines[index].slice(4).trim()));
        }
        entry[key] = items;
      } else {
        entry[key] = "";
      }
      continue;
    }

    entry[key] = unquote(value);
  }

  return entry;
}

export function stringifyCatalogYaml(entry) {
  const lines = [];
  for (const key of requiredFields) {
    const value = entry[key];
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${item}`);
    } else if (key === "install" || key === "educatorSummary") {
      lines.push(`${key}: |`);
      for (const blockLine of String(value).split("\n")) lines.push(`  ${blockLine}`);
    } else if (key === "submittedAt") {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value ?? ""}`);
    }
  }
  return `${lines.join("\n")}\n`;
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function normalizeEntry(entry, sourcePath) {
  const errors = [];
  for (const field of requiredFields.filter((key) => key !== "launchUrl")) {
    if (!(field in entry)) errors.push(`${field}: required`);
  }

  const normalized = {
    ...entry,
    homepage: entry.homepage || "",
    launchUrl: entry.launchUrl || "",
    tags: Array.isArray(entry.tags)
      ? [...new Set(entry.tags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))]
      : [],
    educationLevels: normalizeList(entry.educationLevels),
    useCases: normalizeList(entry.useCases),
    cautions: normalizeList(entry.cautions)
  };

  if (!stringOk(normalized.name, 1, 80)) errors.push("name: must be 1-80 characters");
  if (!stringOk(normalized.description, 12, 320)) {
    errors.push("description: must be 12-320 characters");
  }
  if (!stringOk(normalized.educatorSummary, 20, 800)) {
    errors.push("educatorSummary: must be 20-800 characters");
  }
  if (!stringOk(normalized.authorName, 1, 80)) errors.push("authorName: must be 1-80 characters");
  if (normalized.authorGitHub && !/^[A-Za-z0-9-]{1,39}$/.test(normalized.authorGitHub)) {
    errors.push("authorGitHub: must be a GitHub username");
  }
  if (normalized.repo && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(normalized.repo)) {
    errors.push("repo: must use owner/name");
  }
  if (normalized.homepage && !isUrl(normalized.homepage)) errors.push("homepage: must be a URL or blank");
  if (normalized.launchUrl && !isUrl(normalized.launchUrl)) {
    errors.push("launchUrl: must be a URL or blank");
  }
  if (normalized.tags.length < 1 || normalized.tags.length > 8) {
    errors.push("tags: must contain 1-8 tags");
  }
  if (normalized.educationLevels.length < 1 || normalized.educationLevels.length > 8) {
    errors.push("educationLevels: must contain 1-8 levels");
  }
  if (normalized.useCases.length < 1 || normalized.useCases.length > 8) {
    errors.push("useCases: must contain 1-8 use cases");
  }
  if (normalized.cautions.length < 1 || normalized.cautions.length > 8) {
    errors.push("cautions: must contain 1-8 cautions");
  }
  if (!stringOk(normalized.language, 1, 40)) errors.push("language: must be 1-40 characters");
  if (!stringOk(normalized.install, 1, 1600)) errors.push("install: must be 1-1600 characters");
  if (!stringOk(normalized.license, 1, 60)) errors.push("license: must be 1-60 characters");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized.submittedAt || "")) {
    errors.push("submittedAt: must be YYYY-MM-DD");
  }

  if (errors.length > 0) {
    const error = new Error(errors.join("; "));
    error.name = "CatalogValidationError";
    throw error;
  }

  return {
    ...normalized,
    sourcePath
  };
}

function stringOk(value, min, max) {
  return typeof value === "string" && value.length >= min && value.length <= max;
}

function normalizeList(value) {
  return Array.isArray(value)
    ? [...new Set(value.map((item) => String(item).trim()).filter(Boolean))]
    : [];
}

function isUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
