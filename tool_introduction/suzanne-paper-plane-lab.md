---
name: Suzanne 紙飛機飛行實驗室
authorName: Sonville
authorGitHub: Sonville
repo: Sonville/suzanne-paper-plane-lab
homepage:
launchUrl: https://sonville.github.io/suzanne-paper-plane-lab/
tags:
  - education
  - teaching
  - github
  - physics
  - aerodynamics
  - threejs
  - simulation
  - inquiry
educationLevels:
  - 中小學
  - 高中
language: JavaScript
license: MIT
submittedAt: "2026-07-18"
---

# Suzanne 紙飛機飛行實驗室

## 簡短描述

互動式 3D 紙飛機飛行模擬器，讓學生調整配重、投擲角度、力道、風向與天氣，觀察飛行結果。

## 教育工作者摘要

Suzanne 紙飛機飛行實驗室是一套以 React、Vite 與 Three.js 製作的 3D 飛行探究工具，適合用在自然科學、物理或 STEM 課堂。學生可以調整 Suzanne 紙飛機的機身、左翼、右翼與左右對稱迴紋針配重，也能改變投擲角度、投擲力道、正面風、側風、晴天、下雨與颱風等環境條件，觀察飛行距離、高度、滯空時間、重心與側偏估算。工具提供平滑飛行動畫、側視、跟隨與全景觀看模式、慢動作重播與飛行關鍵事件提示，適合引導學生建立基準試飛、一次只改變一個變因、先預測再比較結果，進一步討論重心、空氣阻力、風向與天氣對飛行表現的影響。

## 教學用途

- 在國小高年級、國中或高中 STEM 活動中，讓學生透過模擬器建立紙飛機實驗的基準試飛
- 讓學生每次只調整一個變因，例如配重位置、投擲角度、力道或風向，再比較飛行距離、高度與滯空時間
- 搭配實體摺紙飛機活動，要求學生先用模擬器提出假設，再進行實測並討論模擬與真實結果的差異

## 導入注意

- 模擬器的距離、高度、滯空時間、重心與側偏是教學用估算，不能視為工程級空氣動力分析
- 建議教師要求學生保留基準組並一次只改變一個條件，否則不容易判讀哪個變因造成結果差異
- 若在手機或平板上操作 3D 場景，建議先確認裝置效能、螢幕大小與網路載入狀況

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機執行，需安裝 Node.js 20 或更新版本，下載或 clone 專案後執行 npm install 與 npm run dev，再開啟終端機顯示的本機網址；正式建置可執行 npm run build，輸出檔案位於 dist/。
