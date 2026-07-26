---
name: ClassMemo 教室便條貼
authorName: educatres
authorGitHub: educatres
repo: educatres/classmemo
homepage:
launchUrl: https://educatres.github.io/classmemo/
tags:
  - education
  - teaching
  - github
  - classroom
  - sticky-notes
  - firebase
  - realtime
educationLevels:
  - 教室工具
language: JavaScript
license: MIT
submittedAt: "2026-07-26"
---

# ClassMemo 教室便條貼

## 簡短描述

使用 Firebase 即時同步的匿名班級便條貼白板，支援老師建立白板、分享 QR Code 與學生即時協作。

## 教育工作者摘要

ClassMemo 教室便條貼是一個可部署到 GitHub Pages 的課堂匿名便條貼白板。老師可在設定頁產生新的白板連結、學生 QR Code、老師六位數密鑰與學生三位數密鑰；學生用手機、平板或電腦開啟連結後，可匿名新增、編輯、拖曳、縮放、變色與刪除便條貼，所有變更會透過 Firebase Realtime Database 即時同步。相較於以 Google Form 與 Google Sheet 作為中繼資料庫的 ClassBoard，ClassMemo 改用 Firebase Anonymous Authentication 與 Realtime Database，提升多人同時操作時的同步效率與穩定性。老師登入後可凍結學生編輯、清除或刪除白板，並下載或匯入 JSON 回復便條貼內容；白板自建立起保留 3 天，到期後寫入會被規則拒絕並由系統清除資料。它適合用於課堂暖身、出口票、匿名提問、分組討論與即時意見蒐集。

## 教學用途

- 課堂暖身、出口票或匿名提問時，讓學生用便條貼即時提交想法並投影整理
- 小組討論或協作活動中收集觀點，讓全班同步看到便條貼位置、顏色與內容變化
- 老師可在活動中凍結編輯、清除白板或下載 JSON 備份，便於收束討論與課後保存重點

## 導入注意

- 這是匿名課堂工具，取得白板連結或正確學生密鑰的人都可查看及修改白板，請勿收集姓名、學號、Email、電話或敏感資訊
- 老師六位數密鑰可取得白板管理權限，應立即記下並避免分享給學生；遺失後無法由系統補發
- 使用者需自行確認 Firebase 專案、匿名登入與 Realtime Database 規則設定，且白板資料預設建立 3 天後自動清除

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機測試，下載或 clone 專案後可在專案資料夾執行 python3 -m http.server 8080，再開啟 http://localhost:8080/；專案需搭配已設定好的 Firebase Web App、Anonymous Authentication 與 Realtime Database 規則。
