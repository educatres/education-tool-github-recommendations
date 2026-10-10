---
name: 導師全班各科學業表現登錄系統
authorName: kueilan
authorGitHub: kueilan
repo: kueilan/LearningPerformance_Single
homepage:
launchUrl:
tags:
  - education
  - teaching
  - github
  - gradebook
  - student-progress
  - google-apps-script
educationLevels:
  - 中小學
  - 高中
language: HTML
license: Unspecified
submittedAt: "2026-10-10"
---

# 導師全班各科學業表現登錄系統

## 簡短描述

以 Google Apps Script 與 Google Sheets 建置的班級成績登錄系統，讓導師管理學期與名單、小老師登錄本科成績，並供學生及家長查詢個人表現。

## 教育工作者摘要

這套系統協助導師集中管理全班各科成績。導師可建立學期、設定科目、匯入學生名單、登錄成績，並查詢或匯出 CSV、PDF 報表；各科小老師使用綁定學期與科目的密碼，只能登錄本科成績。學生與家長使用個人驗證碼查看歷次成績和成長曲線，導師也可比較個人與全班的表現趨勢。系統以 Google Apps Script 網頁應用程式搭配 Google Sheets 儲存資料，需要由使用單位自行設定並部署。

## 教學用途

- 導師彙整不同學期、科目與考試場次的班級成績，減少分散表單與手動整理
- 讓各科小老師協助登錄本科成績，再由導師進行綜合查詢與匯出
- 透過個人及全班成長曲線，與學生、家長討論學習表現和後續支持方式

## 導入注意

- 系統會處理學生姓名、學號、驗證碼與成績；正式使用前應依校內個資規範設定存取權、保存方式及密碼管理
- 學生驗證碼及小老師密碼需妥善發放，導師密碼應使用足夠強度；公開網頁入口前應依 README 檢查部署與權限設定
- 專案沒有提供可直接使用的公開網站；需自行準備 Google 帳號並部署 Apps Script 網頁應用程式，首次執行 `initSystem()` 時才會初始化資料表

## 啟動或安裝方式

依 GitHub README 準備 Node.js、npm、Google 帳號及 clasp，建立 Apps Script 專案並將 `rootDir` 設為 `src`，再以 `clasp push -f` 上傳程式。接著在腳本屬性設定 `ADMIN_PASSWORD`，執行 `initSystem()` 初始化 Google Sheets，最後將專案部署為網頁應用程式並測試導師、小老師及學生三種登入流程。
