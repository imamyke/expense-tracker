# 家庭記帳支出記帳本
利用 Express 和 passport 打造具有使用者註冊及登入驗證的記帳網頁，且使用者可使用 Facebook 做第三方登入，
除此之外，也加入 chart.js 來優化使用者的記帳體驗，更明確了解記帳狀況。

## 專案畫面
### 首頁
![MyImage](https://i.imgur.com/MFFnxQU.png)
### 登入
![MyImage](https://i.imgur.com/61P8NkR.png)
### 註冊
![MyImage](https://i.imgur.com/UbOAEXO.png)
### 登出
![MyImage](https://i.imgur.com/yYlq2Gi.png)
### 新增
![MyImage](https://i.imgur.com/TnN3S5z.png)
### 編輯
![MyImage](https://i.imgur.com/pWVXvEW.png)
### 表單輸入不完全時，表單會跳出提醒
![MyImage](https://i.imgur.com/p4sfCKj.png)
![MyImage](https://i.imgur.com/mhD93jT.png)

## 專案特色
1. 使用者可以註冊並使用自己的帳號登入網頁，並建立自己的餐廳清單，且加入表單的例外處理，包含:
- 登入頁及註冊頁表單若輸入不完全會提醒使用者填寫完整的表單內容
- 若使用者登出後，會告訴使用者已成功登出
2. 使用者除了手動建立帳號密碼，還可以使用 Facebook 的第三方登入方式註冊帳號密碼
3. 使用者在首頁可以看到所有的支出資料，包含:
- 支出類別
- 支出項目
- 支出時間
- 支出金額
4. 使用者可以篩選支出類別，瀏覽各自類別的支出狀況
5. 使用者可以新增、編輯、刪除支出
6. 使用者可以在畫面看到全部或篩選後的總支出

## 後續優化
1. 增加 Google 第三方登入

## 環境建置
- Node.js

## 專案安裝流程
1. Clone此專案至本機電腦
```
git clone https://github.com/imamyke/expense-tracker.git
```
2. 進入此專案資料夾
```
cd expense-tracker
```
3. 安裝 npm 套件
```
npm install
```
4. 打開Terminal，並輸入以下指令
```
npm run dev
```
5. 當Terminal出現此字句，表示伺服器已成功啟用
```
The server is running on http://localhost:3000
```
現在可以將 http://localhost:3000 輸入至瀏覽器，開始記錄你的支出吧~
