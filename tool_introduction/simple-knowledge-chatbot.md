---
name: Simple Knowledge Chatbot
authorName: educatres
authorGitHub: educatres
repo: educatres/simpleKnowledgeChatbot
homepage:
launchUrl: https://educatres.github.io/simpleKnowledgeChatbot/
tags:
  - education
  - teaching
  - github
  - chatbot
  - ai
  - knowledge-base
  - classroom
educationLevels:
  - 教室工具
language: JavaScript
license: Unspecified
submittedAt: "2026-07-12"
---

# Simple Knowledge Chatbot

## 簡短描述

針對學生可能沒有可用的帳號或電子信箱，無法註冊AI服務時；使用本工具串接老師的模型 API Key，快速建立臨時 AI ChatBot，掃描 QR Code 即可使用，學生無須再註冊帳號。

## 教育工作者摘要

Simple Knowledge Chatbot 是一個不需要後端伺服器或資料庫的純前端 AI 聊天工具，支援 OpenAI、Google AI Studio 與 Claude API。由教師輸入自己的 API key、模型與系統提示詞 (例如：回覆對象為小學五年級，請盡量淺顯易懂，套用日常例子)，產生學生可直接開啟的網址與 QR Code，讓沒有 AI 帳號或電子信箱的學生也能在課堂活動中使用 AI。

本工具也支援上傳 .txt 或 .md 知識庫檔案，AI能優先根據指定知識庫回答，也能嚴格限制只根據知識庫內容回答，不自行編造回覆，適合短期的課堂活動。

## 教學用途

- 教師快速建立課堂共用 AI 聊天頁，讓學生掃 QR Code 即可進入活動
- 搭配 system prompt 設定特定角色、任務規則或課程情境
- 上傳文字知識庫後，引導學生比較一般回答與依指定資料回答的差異

## 導入注意

- 學生端的 API key 放在網址中，會出現在瀏覽器歷史紀錄，下課後應立即更換或註銷
- 知識庫檔案只在使用者瀏覽器讀取，不會隨自動產生的學生網址傳給其他裝置


## 啟動或安裝方式

可直接開啟線上版本使用。
也可以本機使用，請參考來原GitHub部署說明。
