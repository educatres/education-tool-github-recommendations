---
name: 會議時間調查系統
authorName: educatres
authorGitHub: educatres
repo: educatres/schedule-a-meeting
homepage:
launchUrl: https://educatres.github.io/schedule-a-meeting/
tags:
  - education
  - teaching
  - github
  - scheduling
  - firebase
educationLevels:
  - 通用工具
language: JavaScript
license: MIT
submittedAt: "2026-07-26"
---

# 會議時間調查系統

## 簡短描述

使用 Firebase 即時同步的會議時間調查工具，可建立候選時段、分享填寫與結果連結，快速找出適合多數人的會議時間。

## 教育工作者摘要

會議時間調查系統是一個可部署到 GitHub Pages 的開源工具，適合教師、行政人員、研究團隊或學生小組協調共同可參加的時間。發起人可設定會議標題、日期範圍、每日時段、時段長度、是否包含週末與回覆截止時間；建立後系統會產生參加者連結、即時結果連結及不放在網址中的六位數管理密鑰。參加者不用登入或輸入密鑰，只要透過連結填寫姓名、可行時段與備註；以相同標準化姓名再次送出時，會以最新回覆覆蓋舊資料。結果頁會即時顯示所有人皆可參加的時段、推薦時段與參加者明細，方便帶領者決定最終時間。資料存放於 Firebase Realtime Database，每個調查在建立 21 天後會停止存取並由系統自動清除。

## 教學用途

- 協調班級補課、專題分組、師生晤談、社團活動或校內研習的共同可用時段
- 讓專題小組在不必建立帳號的情況下回報空檔，並由組長根據即時統計安排會議
- 在教師社群、行政團隊或研究小組中分享結果連結，快速比較全員可行與多數人可行的時段

## 導入注意

- 知道參加者或結果連結的人都能讀取調查與回覆，姓名僅應作為一般識別文字，請勿填寫敏感個資
- 六位數管理密鑰不會放入網址；遺失密鑰後無法修改設定或指定最終時間，應由發起人妥善保存
- 同名回覆會被最後一次送出的內容覆蓋；若有同名參加者，建議先約定可辨識但不含敏感資訊的名稱格式

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本，選擇「建立新調查」設定候選日期與時段，再分享系統產生的參加者與結果連結。若要自行部署或開發，clone 專案後以 `python3 -m http.server 8080` 啟動本機靜態伺服器，並依 README 設定 Firebase Realtime Database、Anonymous Authentication 與安全規則；不可直接使用 `file://` 開啟。
