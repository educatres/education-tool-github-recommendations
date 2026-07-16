---
name: ClassBoard 班級共創牆
authorName: educatres
authorGitHub: educatres
repo: educatres/classboard
homepage:
launchUrl: https://educatres.github.io/classboard/demo.html
tags:
  - education
  - teaching
  - github
  - classroom
  - sticky-notes
  - google-sheets
educationLevels:
  - 教室工具
language: JavaScript
license: MIT
submittedAt: "2026-07-09"
---

# ClassBoard 班級共創牆

## 簡短描述

免註冊、無廣告的全班線上便條貼共創牆，使用老師自己的 Google Form 與 Google Sheet 儲存資料。

## 教育工作者摘要

ClassBoard 班級共創牆是一個可部署在 GitHub Pages 的線上便條貼牆。學生可用手機、平板或電腦匿名新增、編輯、拖曳、縮放與刪除便條貼；老師可產生學生白板連結與 QR Code，投影同一張共創牆進行腦力激盪、小組討論、議題引導與意見蒐集。工具不需要後端或帳號登入，使用 Google Form 寫入事件紀錄，並從老師自己的 Google Sheet 讀取資料還原白板狀態，網站本身不另外保存老師或學生資料。

## 教學用途

- 課堂暖身、出口票、腦力激盪或議題討論時，讓全班用便條貼快速提交想法
- 小組討論後把觀點貼到同一張牆上，方便教師即時整理、追問與歸納
- 透過老師自己的 Google Sheet 保存活動紀錄，供課後回顧或延伸討論使用

## 導入注意

- 本工具沒有登入與權限控管，請勿要求學生填寫姓名、學號、Email、電話或敏感資訊
- Google Sheet 若設為知道連結者可檢視，知道網址的人可能讀取資料，需確認校內資料規範
- Google Form URL 若外流可能被惡意送出資料，正式使用前建議先以 demo 或測試白板演練流程

## 啟動或安裝方式

可先開啟 GitHub Pages demo 版試用。正式使用時，老師需建立 Google Form 欄位並連結 Google Sheet，將 Sheet 設為知道連結者可檢視，再於設定頁貼上 Sheet、Form 與 entry ID 產生學生白板連結與 QR Code；本機預覽可用 python3 -m http.server 8080 啟動靜態伺服器。
