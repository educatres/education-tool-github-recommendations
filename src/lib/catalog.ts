import catalog from "../data/catalog.generated.json";

const educationLevelOrder = ["中小學", "高中", "大學", "研究"];

export type CatalogEntry = {
  name: string;
  description: string;
  educatorSummary: string;
  authorName: string;
  authorGitHub: string;
  repo: string;
  homepage: string;
  tags: string[];
  educationLevels: string[];
  useCases: string[];
  cautions: string[];
  language: string;
  install: string;
  license: string;
  submittedAt: string;
  sourcePath: string;
  stars: number;
  forks: number;
  lastPushedAt: string;
  repoUrl: string;
  avatarUrl: string;
};

export const entries = catalog as CatalogEntry[];

export const languages = Array.from(new Set(entries.map((entry) => entry.language))).sort((a, b) =>
  a.localeCompare(b)
);

export const tags = Array.from(new Set(entries.flatMap((entry) => entry.tags))).sort((a, b) =>
  a.localeCompare(b)
);

export const educationLevels = Array.from(
  new Set(entries.flatMap((entry) => entry.educationLevels))
).sort((a, b) => {
  const aIndex = educationLevelOrder.indexOf(a);
  const bIndex = educationLevelOrder.indexOf(b);
  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;
  return a.localeCompare(b);
});
