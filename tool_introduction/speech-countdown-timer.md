---
name: 演講倒數計時器
authorName: educatres
authorGitHub: educatres
repo: educatres/speech-countdown-timer
homepage:
launchUrl: https://educatres.github.io/speech-countdown-timer/
tags:
  - education
  - teaching
  - github
  - classroom
  - timer
  - presentation
  - accessibility
educationLevels:
  - 教室工具
  - 通用工具
language: HTML
license: Unspecified
submittedAt: "2026-07-26"
---

# 演講倒數計時器

## 簡短描述

可全螢幕投影的演講倒數計時器，提供第一次叮咚提醒、超時閃爍鬧鈴、目前時間與快捷鍵操作。

## 教育工作者摘要

演講倒數計時器是一個可直接部署到 GitHub Pages 的純前端單頁工具，適合課堂報告、演講、發表會、研習活動與會議控時使用。使用者可設定演講總時間、倒數剩餘幾分鐘時第一次響鈴，以及超時後每隔幾秒重複播放鬧鈴。畫面以黑色背景搭配大型黃色倒數文字呈現，第一次提醒後會切換成黃色警示畫面，時間結束後改為正計時並以大型「已超時」文字、紅色背景閃爍與清脆交替鬧鈴提示。工具也支援顯示或隱藏目前時間、全螢幕、音效測試、倒數進行中淡化控制按鈕、手機與桌機版面，以及空白鍵開始或暫停、R 重設、F 全螢幕、C 顯示或隱藏時鐘等快捷鍵，能讓教師或主持人在投影環境中清楚提示剩餘時間。

## 教學用途

- 在學生口頭報告、專題發表、辯論、朗讀或短講活動中投影大型倒數時間，協助全班掌握節奏
- 在研習、工作坊、會議或分組討論中設定第一次提醒與超時鬧鈴，提醒講者收尾或進入下一段流程
- 搭配全螢幕與時鐘顯示，作為教室、禮堂或線上會議共享畫面的簡潔控時工具

## 導入注意

- 瀏覽器通常需要使用者先點擊開始或測試音效按鈕後，才允許播放叮咚與鬧鈴聲
- 實際音量仍受電腦、投影機、外接喇叭與系統音量限制，正式活動前建議先測試音效與顯示距離
- 紅色閃爍與高音量鬧鈴可能不適合所有學習者或場域，若有感官敏感需求可預先關閉超時鬧鈴或調整使用方式

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機測試，下載或 clone 專案後可直接用瀏覽器開啟 index.html；工具是單一 HTML 檔、純前端、無需建置、無需後端，也可用 python3 -m http.server 8000 啟動靜態伺服器後開啟 http://localhost:8000。
