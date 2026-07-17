---
name: Drift Quest｜洋流漂流任務
authorName: educatres
authorGitHub: educatres
repo: educatres/drift-quest
homepage:
launchUrl: https://educatres.github.io/drift-quest/
tags:
  - education
  - teaching
  - github
  - science
  - ocean
  - currents
  - simulation
  - game
educationLevels:
  - 中小學
language: JavaScript
license: MIT
submittedAt: "2026-07-17"
---

# Drift Quest｜洋流漂流任務

## 簡短描述

國中海洋科學互動遊戲，讓學生調整月份、深度、海錨與小帆，利用洋流讓科學漂流瓶抵達目標。

## 教育工作者摘要

Drift Quest 洋流漂流任務是一套可部署到 GitHub Pages 的純前端海洋科學互動遊戲。學生操作一枚科學漂流瓶，在臺灣、菲律賓北部、琉球與日本南部海域的互動地圖上，觀察洋流粒子與方向箭頭，調整出發月份、漂流深度、小帆面積、海錨與模擬速度，嘗試讓漂流瓶從 A 地抵達 B 地。教材提供 12 個循序漸進關卡，涵蓋洋流方向、季節差異、不同深度流況、颱風外圍影響、生態夥伴與自由模式，也會記錄漂流軌跡、距離、速度、科學觀察與任務報告。它適合用來引導學生把海流、季風、深度與路徑預測連結起來，並討論模型資料與真實海洋環境之間的差異。

## 教學用途

- 在國中自然科或海洋教育課程中，讓學生觀察洋流方向、速度與漂流路徑之間的關係
- 透過改變月份、深度、海錨與小帆，要求學生比較季節洋流、垂直水層與風力對漂流結果的影響
- 使用颱風、生態夥伴與自由模式關卡，引導學生討論海洋環境變因、風險判斷與科學模型限制

## 導入注意

- 本遊戲用於教學情境，不可作為航海、救難、氣象預報或野外活動決策依據
- 內建洋流資料是為課堂活動設計的簡化教學資料，即使接入 Copernicus Marine 或 NOAA 資料，也應提醒學生模型與真實觀測仍有差距
- 地圖圖磚、Leaflet CDN、Copernicus Marine 與 NOAA 資料各有授權或使用條款，正式大量使用或校內部署前應先確認網路與授權規範

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機測試，因遊戲會載入 JSON 資料，建議在專案資料夾執行 python3 -m http.server 8080，再開啟 http://localhost:8080；若要更新真實洋流或颱風資料，需依 README 設定 Copernicus Marine 帳號、GitHub Secrets 與資料更新腳本。
