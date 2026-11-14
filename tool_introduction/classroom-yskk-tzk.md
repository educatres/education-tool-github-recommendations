---
name: 成語彈珠檯—觀中特仕版
authorName: kisaraki
authorGitHub: kisaraki
repo: kisaraki/classroom-yskk-tzk
homepage:
launchUrl: https://kisaraki.github.io/classroom-yskk-tzk/
tags:
  - education
  - teaching
  - language-learning
  - game
educationLevels:
  - 中小學
language: JavaScript
license: Unspecified
submittedAt: "2026-11-14"
---

# 成語彈珠檯—觀中特仕版

## 簡短描述

以觀音國中在地文化與海岸意象設計的五關成語闖關遊戲；學生操控彈珠依序碰撞四字成語，讀注音、理解詞義並完成挑戰。

## 教育工作者摘要

這是一個以原生 JavaScript、Canvas 與 ES Modules 製作的瀏覽器遊戲，適合在平板橫向操作，也支援桌機方向鍵、WASD 或虛擬搖桿。遊戲提供感測器開啟與水平校正教學，並以觀音國中、校園、海岸與地方文化作為情境，將成語識讀融入遊戲流程。README 說明目前為平板測試版，題庫仍待人工核校，因此導入課堂前應先確認題目內容與裝置相容性。

## 教學用途

- 作為國語文課的成語識讀、注音與詞義複習活動
- 以五關闖關形式進行課堂暖身、分組挑戰或學習任務
- 引導學生從遊戲中的地方文化圖像討論校園、社區與海岸特色

## 導入注意

- 目前是平板測試版，README 標示題庫尚待人工核校，不宜直接作為正式評量依據
- 使用平板感測器前，需說明授權用途並先在實際 iPadOS 或 Android 裝置測試；無法使用感測器時可改用搖桿或鍵盤
- 若課堂記錄玩家名稱或遊戲成果，請先確認資料是否儲存在裝置或瀏覽器，以及學校的隱私與資料治理規範

## 啟動或安裝方式

可直接開啟 [GitHub Pages 平板測試版](https://kisaraki.github.io/classroom-yskk-tzk/)；若要本機測試，依 README 使用 `node tools/serve.mjs` 啟動伺服器，再以瀏覽器開啟 `http://127.0.0.1:4173/`。正式使用前請依專案的核校與發布流程準備已審核題庫。
