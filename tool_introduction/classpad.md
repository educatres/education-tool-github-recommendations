---
name: ClassPad 全班手寫板
authorName: educatres
authorGitHub: educatres
repo: educatres/classpad
homepage:
launchUrl: https://educatres.github.io/classpad/
tags:
  - education
  - teaching
  - github
  - classroom
  - whiteboard
  - firebase
  - realtime
educationLevels:
  - 教室工具
language: JavaScript
license: CC BY-NC-SA 4.0
submittedAt: "2026-07-26"
---

# ClassPad 全班手寫板

## 簡短描述

專為生生平板與 Apple Pencil 設計的 Firebase 即時同步課堂白板，讓教師建立學生專屬連結、同步監看手寫內容並遠端批注。

## 教育工作者摘要

ClassPad 全班手寫板是可部署在 GitHub Pages 的即時課堂書寫工具，適合在每位學生使用平板的情境中進行解題、標示、練習與作品分享。老師建立課堂並匯入最多 80 位學生後，系統會產生各自專屬的 QR Code 與連結；學生無須註冊帳號，首次開啟時會綁定匿名裝置，以避免誤進他人的白板。教師可使用 4、6、8 或 12 格畫面即時監看全班進度，直接在學生白板上批注，也能設定共用題目底圖、把指定學生的作品即時投影給全班觀摩，並在課後將全班白板打包下載為 PNG 圖檔。工具採用 Firebase Anonymous Authentication 與 Realtime Database，線上版本建立的課堂可使用 3 小時，期限後會自動清除資料。

## 教學用途

- 在數學、自然、語文或圖像標示活動中，讓學生直接在共用題目底圖上手寫作答
- 教師以多格監看畫面掌握全班練習進度，並對個別學生即時圈選、提示或批注
- 投影指定學生的解題過程或作品，引導全班比較策略、口頭說明與同儕回饋

## 導入注意

- 學生連結會綁定首次使用的裝置；若需更換裝置，須由老師解除綁定，課前應先安排掃碼與連線測試時間
- 老師連結與六位數密鑰可取得完整管理權限，請勿分享給學生，且只應建立座號或暱稱等必要識別資料
- 線上版本的課堂資料 3 小時後會自動清除，需保留的學生作品請在到期前下載；自行部署時也應妥善設定 Firebase 安全規則與資料保存方式

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本，按「建立新課堂」後匯入學生名單並分享個別 QR Code 或連結。若要自行開發或部署，clone 專案後執行 `cp .env.example .env`、`pnpm install` 與 `pnpm dev`，並在 `.env` 設定 Firebase Web App；另須啟用 Firebase Anonymous Authentication、Realtime Database 與專案提供的安全規則。
