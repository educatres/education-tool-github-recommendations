# 教育工具 GitHub 推薦網站

這是一個給教育工作者看的 GitHub 教育工具推薦網站。網站讀取 `list.txt` 的 GitHub repo 連結，從 GitHub API 與 README 取得專案資訊，整理成包含適用教育階段、教學用途、導入注意事項與 GitHub Stars 的推薦卡片。

## 本機使用

```bash
npm install
npm run import:list
npm run sync:introductions
npm run validate:catalog
npm run enrich:catalog
npm run dev
```

建置靜態網站：

```bash
npm run build
```

`npm run build` 會自動執行 `import:list`、`sync:introductions`、`validate:catalog` 與 `enrich:catalog`。

## Tool Introduction Markdown

每個工具的推薦文字都放在 `tool_introduction/`，一個工具一個 Markdown 檔案。可直接修改下列區塊：

- `簡短描述`
- `教育工作者摘要`
- `教學用途`
- `導入注意`
- `啟動或安裝方式`

修改後執行：

```bash
npm run sync:introductions
```

同步腳本會把 Markdown 內容回寫到 `catalog/` 的 YAML，網站建置時也會自動同步一次。

## list.txt 格式

每行使用 tab 分隔欄位。第一欄是 GitHub repository，可使用完整網址或 `owner/repo`；第二欄是教育階段分類；第三欄選填，填入可直接使用工具的網站：

```text
https://github.com/educatres/audience-analysis	中小學、高中
openai/openai-cookbook	不限領域	https://example.com/tool/
```

空行與 `#` 開頭註解會被忽略。v1 僅支援 GitHub repository；非 GitHub 網址會略過並顯示警告。

## Catalog YAML

`npm run import:list` 會在 `catalog/` 產生 YAML：

```yaml
name: 課堂聽眾專注度分析
description: 透過瀏覽器鏡頭與視覺模型觀察課堂整體專注趨勢，協助教師掌握聽眾狀態。
educatorSummary: |
  這是一個單檔網頁工具...
authorName: educatres
authorGitHub: educatres
repo: educatres/audience-analysis
homepage:
launchUrl:
tags:
  - education
  - teaching
  - github
educationLevels:
  - 高中
  - 大學
  - 成人教育/教師研習
useCases:
  - 大型課堂或講座中快速掌握整體注意力變化
cautions:
  - 使用攝影機前需透明告知並取得必要同意
language: HTML
install: |
  下載或 clone 專案後...
license: MIT
submittedAt: "2026-07-07"
```

Stars、forks、更新時間、repo URL 與 avatar 由 `scripts/enrich-catalog.mjs` 從 GitHub API 取得，不需要手動填寫。

## GitHub Pages

1. 將此專案推到 GitHub repository。
2. 到 repository settings 啟用 Pages，source 選 GitHub Actions。
3. 設定 repository variables：
   - `SITE_URL`：例如 `https://<owner>.github.io`
   - `SITE_BASE`：若部署到 project page，填 `/<repo-name>/`；若是 user/org page，填 `/`。
4. Push 到 `main` 後，`.github/workflows/pages.yml` 會建置並部署網站。
