---
name: 課堂單選作答系統
authorName: educatres
authorGitHub: educatres
repo: educatres/github-class-quiz-helper
homepage:
launchUrl: https://educatres.github.io/github-class-quiz-helper/teacher.html
tags:
  - education
  - teaching
  - github
educationLevels:
  - 中小學
  - 高中
  - 大學
language: JavaScript
license: Unspecified
submittedAt: "2026-07-08"
---

# 課堂單選作答系統

## 簡短描述

純前端課堂單選作答工具，老師用 Google Sheet 管理題目與答案公布狀態，學生掃 QR code 作答。

## 教育工作者摘要

這是一個適合部署在 GitHub Pages 的純前端課堂單選作答工具。老師可用 Google Sheet 管理題目、選項、開放狀態與答案公布狀態，再由老師頁產生學生網址與 QR code；學生用手機進入網頁後作答，姓名與作答紀錄只儲存在學生自己的瀏覽器 localStorage。它適合用於不需要登入、不需要集中保存答案的即時練習、課堂暖身、形成性檢核或公布答案後的自我訂正情境。

## 教學用途

- 課堂暖身、概念檢核或單選題即時練習
- 老師用 Google Sheet 控制題目開放與答案公布節奏
- 學生掃 QR code 作答並在答案公布後自行查看結果

## 導入注意

- 不會收集全班答案到雲端，老師無法看到全班答對率或個別答案
- 不適合正式考試、防作弊測驗或需要集中保存作答紀錄的情境
- 若公布前將 correctAnswer 寫在公開 CSV，懂技術的學生可能提前看到答案

## 啟動或安裝方式

可依 README 連結進入線上版本使用：https://educatres.github.io/github-class-quiz-helper/teacher.html。若要自行部署或改作課堂版本，請先閱讀 GitHub 專案內容並在測試環境確認權限、資料處理與瀏覽器相容性。
