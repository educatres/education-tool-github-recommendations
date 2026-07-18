---
name: 地形探險隊-亞洲
authorName: educatres
authorGitHub: educatres
repo: educatres/terrain-explorer-asia
homepage: https://educatres.github.io/terrain-explorer-asia/
launchUrl: https://educatres.github.io/terrain-explorer-asia/
tags:
  - education
  - teaching
  - github
  - geography
  - earth-science
  - ecology
  - interactive-map
  - leaflet
educationLevels:
  - 中小學
  - 高中
language: JavaScript
license: MIT
submittedAt: "2026-07-19"
---

# 地形探險隊-亞洲

## 簡短描述

亞洲互動式地理教材，可在衛星地圖上探索亞洲地形、國家公園、代表性動植物與延伸資料來源。

## 教育工作者摘要

地形探險隊-亞洲是一套可部署到 GitHub Pages 的互動式地理教材。學生可在以亞洲為中心的 Esri World Imagery 衛星地圖上探索東亞、東南亞、南亞、中亞、西亞與北亞的山脈、河流、湖泊、特殊地形、國家公園及代表性動植物。教材使用 Leaflet 地圖、七類可獨立開關的教材圖層，以及亞洲代表性景點、物種、概略山脈線、河流線與湖泊面，提供中文與英文名稱搜尋、輪播導覽、觀察任務與隨機挑戰。資訊卡會呈現地理成因、生態特徵、主要來源與延伸閱讀，也提供 Wikimedia Commons 免費授權照片並標示作者、授權與原始來源。它適合用於地理、自然科學與環境教育課程，協助學生在同一張地圖中比較喜馬拉雅山脈、烏拉山脈、大河流域、湖泊與亞洲不同區域生態分布。

## 教學用途

- 在地理或自然科課程中帶學生辨識亞洲主要山脈、河流、湖泊、特殊地形與國家公園的位置關係
- 讓學生比較東亞、東南亞、南亞、中亞、西亞與北亞的地形差異，以及代表物種與棲地分布
- 搭配輪播導覽、觀察任務與隨機挑戰，引導學生從衛星影像、地圖圖層、照片與資料來源整理亞洲地理觀察

## 導入注意

- 概略地理資料是為教學簡化後的示意圖層，不可用於導航、工程、土地界線、災害判定或科學研究
- 衛星底圖、Wikimedia Commons 照片、UNESCO、IUCN、各國公園主管機關與 Kew 等資料來源各有授權條件，公開使用前應逐項確認
- 亞洲範圍大且區域差異明顯，建議教師搭配分區地圖或課本圖表，協助學生建立區域名稱與地形位置的連結

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機測試，因網站使用 ES modules 並透過 fetch() 載入 JSON 資料，請在專案資料夾執行 python3 -m http.server 8000，再開啟 http://localhost:8000。
