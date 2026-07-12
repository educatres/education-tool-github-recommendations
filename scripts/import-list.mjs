import fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from "node:buffer";
import { normalizeEntry, parseCatalogYaml, stringifyCatalogYaml } from "./catalog-schema.mjs";

const listPath = path.resolve("list.txt");
const catalogDir = path.resolve("catalog");
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const allowedEducationLevels = ["不限領域", "中小學", "高中", "大學", "研究"];

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "education-tool-github-recommendations"
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function parseRepo(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const shorthand = trimmed.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
  if (shorthand) return `${shorthand[1]}/${shorthand[2]}`;

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "github.com") return { unsupported: trimmed };
    const [owner, repo] = url.pathname.replace(/^\/|\/$/g, "").split("/");
    if (!owner || !repo) return { unsupported: trimmed };
    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return { unsupported: trimmed };
  }
}

function parseEducationLevels(value) {
  return [
    ...new Set(
      value
        .split(/[、,，\s]+/)
        .map((item) => item.trim())
        .filter((item) => allowedEducationLevels.includes(item))
    )
  ];
}

function parseListItem(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const columns = line.split("\t").map((part) => part.trim());
  const [repoValue = "", levelValue = "", launchUrl = ""] = columns;
  const parsed = parseRepo(repoValue);
  if (!parsed) return null;
  if (typeof parsed === "object" && parsed.unsupported) return parsed;

  return {
    repo: parsed,
    educationLevels: parseEducationLevels(levelValue),
    launchUrl
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function taipeiDate() {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: githubHeaders() });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${url}`);
  return response.json();
}

async function fetchReadme(repo) {
  try {
    const data = await fetchJson(`https://api.github.com/repos/${repo}/readme`);
    return Buffer.from(data.content || "", "base64").toString("utf8");
  } catch (error) {
    console.warn(`README not available for ${repo}: ${error.message}`);
    return "";
  }
}

function markdownTitle(readme, fallback) {
  const title = readme.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return title || fallback;
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(readme) {
  const paragraph = readme
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith("#") && !part.startsWith("!"));
  return plainText(paragraph || "").slice(0, 300);
}

function inferEducationLevels(text) {
  const levels = [];
  const candidates = [
    ["中小學", /國小|小學|國中|初中|elementary|middle school|junior high/i],
    ["高中", /高中|高職|high school|secondary/i],
    ["大學", /大學|college|university|高教/i],
    ["研究", /研究|研究所|研究生|graduate|research/i]
  ];

  for (const [label, pattern] of candidates) {
    if (pattern.test(text)) levels.push(label);
  }

  if (/課堂|classroom|教學|lecture|聽眾|audience/i.test(text)) {
    for (const level of ["高中", "大學"]) {
      if (!levels.includes(level)) levels.push(level);
    }
  }

  return levels.length > 0 ? levels : ["中小學", "高中", "大學"];
}

function genericRecommendation(repo, repoData, readme) {
  const text = `${repoData.name || ""} ${repoData.description || ""} ${readme}`;
  const title = markdownTitle(readme, repoData.name || repo.split("/")[1]);
  const summary = firstParagraph(readme) || repoData.description || `${title} 是一個可從 GitHub 取得的教育工具專案。`;
  const levels = inferEducationLevels(text);

  return {
    name: title,
    description: summary.slice(0, 220),
    educatorSummary: `${summary} 教育工作者可先從 README 的使用流程與限制開始評估，確認課堂情境、學生資料與校內資訊安全規範都適合後再導入。`,
    educationLevels: levels,
    useCases: [
      "課前評估工具功能是否符合課程需求",
      "作為課堂活動、教學管理或學習輔助的候選工具",
      "搭配 GitHub README 與原始碼了解部署方式"
    ],
    cautions: [
      "正式使用前請先小規模測試",
      "若涉及學生資料或影像，需確認同意、隱私與校內規範",
      "GitHub stars 僅作為社群參考，不代表教學品質保證"
    ]
  };
}

function audienceAnalysisRecommendation() {
  return {
    name: "課堂聽眾專注度分析",
    description:
      "透過瀏覽器鏡頭與視覺模型觀察課堂整體專注趨勢，協助教師掌握聽眾狀態。",
    educatorSummary:
      "這是一個單檔網頁工具，可在課堂中定時擷取畫面並呼叫支援 Responses API 的視覺模型，估算總人數、疑似不專心人數、手機使用比例與趨勢。它適合做為教師調整課堂節奏、觀察群體參與狀態與課後反思的輔助資料，不應用於個人評分、紀律處分或身分辨識。",
    educationLevels: ["高中", "大學"],
    useCases: [
      "大型課堂或講座中快速掌握整體注意力變化",
      "教師研習時示範 AI 視覺模型在教學觀察上的可能性",
      "課後回顧不同教學段落的群體參與趨勢"
    ],
    cautions: [
      "使用攝影機前需透明告知並取得必要同意",
      "分析結果僅供群體觀察參考，不應用於個人評分或懲處",
      "影像會送到使用者設定的 API endpoint，需確認資料保護與校內規範"
    ]
  };
}

function handRaiseCounterRecommendation() {
  return {
    name: "聽眾舉手統計",
    description:
      "透過瀏覽器鏡頭與視覺模型統計現場聽眾人數、舉手人數與舉手比例，協助教師掌握互動回應。",
    educatorSummary:
      "這是一個可直接在瀏覽器開啟的單頁工具，可連接攝影機並呼叫視覺模型 API，手動或定時統計現場聽眾總人數、舉手人數與比例。它適合在講座、課堂提問、即時投票或大型活動中快速掌握群體回應，但仍應把結果視為輔助觀察資料，而非個別學生表現判定。",
    educationLevels: ["中小學", "高中", "大學"],
    useCases: [
      "課堂提問後快速估計整體舉手回應比例",
      "講座或工作坊中投影全螢幕儀表板，輔助主持人掌握互動狀況",
      "比較不同活動段落的參與度變化，作為課後教學反思資料"
    ],
    cautions: [
      "使用攝影機前需透明告知並取得必要同意",
      "統計結果可能受拍攝角度、遮擋與模型判斷影響，應以人工觀察輔助確認",
      "API key 需由使用者自行保管，並確認影像傳輸符合校內資料保護規範"
    ],
    install:
      "使用 Chrome 或 Edge 開啟 舉手統計.html，允許攝影機權限後選擇 API 服務並填入 API key 或 Bearer token。若直接開啟檔案遇到瀏覽器安全限制，可改用本機靜態伺服器提供檔案。"
  };
}

function learningPortfolioAiCoachRecommendation() {
  return {
    name: "學習歷程自述 AI 教練",
    description:
      "以 AGENTS.md 將 AI 代理人設定成學習歷程自述教練，引導高中生盤點經驗、整理反思並連結目標校系。",
    educatorSummary:
      "這是一份可放入 Google Antigravity 2.0 專案根目錄的 AGENTS.md 規則檔，會把 AI 代理人設定成學習歷程自述教練。它透過五階段流程協助學生盤點經驗、回顧歷程、整理亮點、連結未來與修整表達，強調不代寫、不編造、不誇大，適合教師或輔導人員用來陪伴學生準備備審資料與自述初稿。",
    educationLevels: ["高中"],
    useCases: [
      "高中生準備大學個人申請、推甄或備審資料時整理自述素材",
      "教師或輔導人員建立一致的學習歷程訪談與回饋流程",
      "協助學生把多元表現、學習計畫與目標校系需求連結起來"
    ],
    cautions: [
      "工具定位是引導與回饋，不應替學生代寫可直接提交的內容",
      "所有經驗細節需由學生本人提供，避免編造或誇大",
      "完成版本仍建議交由指導教師或輔導老師審閱"
    ],
    install:
      "下載或複製本專案後，在 Google Antigravity 2.0 建立新專案，將 AGENTS.md 放在專案資料夾最外層，再開啟新對話並描述申請科系或備審需求。"
  };
}

async function existingEntriesByRepo() {
  const entries = new Map();
  try {
    const names = await fs.readdir(catalogDir);
    for (const name of names) {
      if (!name.endsWith(".yaml") && !name.endsWith(".yml")) continue;
      const filePath = path.join(catalogDir, name);
      const raw = await fs.readFile(filePath, "utf8");
      const entry = normalizeEntry(parseCatalogYaml(raw), path.relative(process.cwd(), filePath));
      entries.set(entry.repo, { entry, filePath });
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return entries;
}

function dynamicRepoFields(repo, repoData) {
  return {
    authorName: repoData.owner?.login || repo.split("/")[0],
    authorGitHub: repo.split("/")[0],
    repo,
    homepage: repoData.homepage || "",
    launchUrl: "",
    tags: [
      "education",
      "teaching",
      "github",
      ...(repoData.topics || []).slice(0, 5)
    ],
    language: repoData.language || "Unknown",
    license: repoData.license?.spdx_id || repoData.license?.name || "Unspecified"
  };
}

function buildEntry(repo, repoData, readme, manualEducationLevels = [], launchUrl = "") {
  const recommendation = (() => {
    if (repo === "educatres/audience-analysis") return audienceAnalysisRecommendation();
    if (repo === "educatres/hand-raise-counter") return handRaiseCounterRecommendation();
    if (repo === "educatres/learning-portfolio-ai-coach") {
      return learningPortfolioAiCoachRecommendation();
    }
    return genericRecommendation(repo, repoData, readme);
  })();

  const entry = {
    ...recommendation,
    ...dynamicRepoFields(repo, repoData),
    launchUrl,
    educationLevels:
      manualEducationLevels.length > 0 ? manualEducationLevels : recommendation.educationLevels,
    install:
      recommendation.install ||
      (repo === "educatres/audience-analysis"
        ? "下載或 clone 專案後，建議用 python3 -m http.server 8000 啟動本機 HTTP server，再開啟 聽眾分析.html。使用前需準備可用攝影機與支援影像輸入的 API key。"
        : "請依 GitHub README 的安裝與啟動說明操作，並先在測試環境確認權限、資料與瀏覽器相容性。"),
    submittedAt: taipeiDate()
  };

  return normalizeEntry(entry, `list.txt:${repo}`);
}

async function main() {
  const raw = await fs.readFile(listPath, "utf8");
  const listItems = [];
  const unsupported = [];

  for (const line of raw.split(/\r?\n/)) {
    const parsed = parseListItem(line);
    if (!parsed) continue;
    if (typeof parsed === "object" && parsed.unsupported) {
      unsupported.push(parsed.unsupported);
      continue;
    }
    if (!listItems.some((item) => item.repo === parsed.repo)) listItems.push(parsed);
  }

  await fs.mkdir(catalogDir, { recursive: true });
  const existing = await existingEntriesByRepo();

  for (const item of listItems) {
    const { repo, educationLevels, launchUrl } = item;
    const current = existing.get(repo);
    if (current) {
      console.log(`Skipped existing ${repo} -> ${path.relative(process.cwd(), current.filePath)}`);
      continue;
    }

    const repoData = await fetchJson(`https://api.github.com/repos/${repo}`);
    const readme = await fetchReadme(repo);
    const entry = buildEntry(repo, repoData, readme, educationLevels, launchUrl);
    const filePath = path.join(catalogDir, `${slugify(repo.split("/")[1])}.yaml`);
    await fs.writeFile(filePath, stringifyCatalogYaml(entry));
    console.log(`Imported ${repo} -> ${path.relative(process.cwd(), filePath)}`);
  }

  for (const item of unsupported) {
    console.warn(`Unsupported list item skipped: ${item}`);
  }

  if (listItems.length === 0) {
    console.warn("No GitHub repositories found in list.txt.");
  }
}

await main();
