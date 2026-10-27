---
name: MeetingTutor｜會議記錄與上課錄音助教
authorName: educatres
authorGitHub: educatres
repo: educatres/MeetingTutor
homepage:
launchUrl: https://educatres.github.io/MeetingTutor/
tags:
  - education
  - teaching
  - classroom
  - transcription
  - meeting-notes
  - ai-assistant
educationLevels:
  - 教室工具
  - 通用工具
language: TypeScript
license: Unspecified
submittedAt: "2026-10-28"
---

# MeetingTutor｜會議記錄與上課錄音助教

## 簡短描述

可在瀏覽器將會議或課堂錄音轉成文字，再配合自備的 AI 服務整理、潤飾並產出會議文件的靜態網頁工具。

## 教育工作者摘要

MeetingTutor 是可部署到 GitHub Pages 的瀏覽器工具，使用 Whisper 模型將錄音轉錄為文字，並可選用 OpenAI、xAI／Grok、Google 或 CGU 的文字模型協助潤飾。教師可參照 PDF 或文字資料，將上課錄音、討論內容或行政會議整理為可編輯的文件；目前以人工標記說話者與段落編輯為主。API Key 和偏好設定保留在目前瀏覽器，適合在受信任的個人裝置上先行測試。

## 教學用途

- 將課堂討論、專題口頭報告或教師會議錄音轉為可整理的文字稿
- 依課程講義、會議資料或 PDF 參考內容，協助整理重點、決議與後續工作
- 讓學生比對錄音與整理後的文字，練習摘要、修訂紀錄與資訊查證

## 導入注意

- 初次使用需要下載 Whisper 與 ONNX Runtime 資源，轉錄前應預留網路頻寬與等待時間；目前尚未自動切換 WebGPU
- 尚未提供可靠的自動說話者分離，涉及多人對談時須由使用者人工辨識及修正說話者
- API Key、服務商與設定會存於瀏覽器 `localStorage`；請只在受信任的裝置使用，並先取得錄音對象的同意、確認資料與 API 供應商的隱私規範

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用；先於「AI 設定」選擇服務商、輸入自己的 API Key 並測試連線，再上傳或錄製音訊。若要本機開發，依 README 執行 `npm install` 和 `npm run dev`；部署前需在 GitHub Pages 設定中選擇 GitHub Actions 作為發布來源。
