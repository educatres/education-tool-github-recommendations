---
name: NIBBLES｜3D 彈珠台字彙遊戲
authorName: kisaraki
authorGitHub: kisaraki
repo: kisaraki/classroom-nibbles-tzk
homepage: https://kisaraki.github.io/classroom-nibbles-tzk/
launchUrl: https://kisaraki.github.io/classroom-nibbles-tzk/
tags:
  - education
  - teaching
  - github
  - english
  - vocabulary
  - game-based-learning
  - threejs
educationLevels:
  - 中小學
  - 高中
language: TypeScript
license: Unspecified
submittedAt: "2026-08-23"
---

# NIBBLES｜3D 彈珠台字彙遊戲

## 簡短描述

結合貪食蛇、3D 彈珠台與英文拼字任務的桌面網頁遊戲，讓學生在操控與限時挑戰中練習 CEEC Level 1–6 字彙。

## 教育工作者摘要

NIBBLES 是一套以 Three.js 製作的 3D 英文字彙遊戲，將經典貪食蛇玩法放進固定視角的科幻彈珠台。學生可選擇 CEEC Level 1–6、漸進或混合字彙模式，在五個場景中依序收集組成目標單字的字母與標點符號；完成拼字後，還要在限時視窗連續正確輸入單字三次，加強辨識、拼寫與鍵盤輸入。遊戲另有桌面傾斜、晃動、射擊、時間增減道具與碰撞恢復等機制，適合用作國中、高中英文課的字彙複習、個別挑戰或遊戲化學習活動。

## 教學用途

- 依 CEEC 字彙級別安排課前暖身、課後複習或分級自主練習
- 透過依序收集字母及連續正確輸入，練習單字字形、內部標點與拼寫精確度
- 使用固定 seed 重現相同的五場景、二十五字任務，進行同儕挑戰或比較學習策略

## 導入注意

- 遊戲需要具 WebGL 能力的桌面瀏覽器與實體鍵盤，不適合以手機觸控操作
- 操作同時涉及方向鍵、Shift、J、空白鍵與 P，建議教師先示範基本移動、暫停及拼字流程
- 遊戲的速度、計時與多種機制可能增加認知負荷，宜依學生程度選擇字彙級別並提供低壓練習時間

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用，無需註冊。建議使用支援 WebGL 的桌面版瀏覽器與實體鍵盤。若要本機執行，需安裝 Node.js 22.12 以上與 npm 10 以上，下載或 clone 專案後執行 npm install，再以 npm run dev 啟動。
