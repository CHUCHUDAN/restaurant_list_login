餐廳清單
====
使用node.js + express並使用MongoDB作為資料庫的美食清單網站

專案畫面
---
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/login.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/register.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/index.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/index2.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/detail.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/edit.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/new.png)
-------
![image](https://github.com/CHUCHUDAN/restaurant_list_login/blob/main/public/img/sort.png)
-------
Features - 產品功能
-----
1.使用者可以瀏覽個人帳號的全部餐廳。

2.使用者可以點擊任一餐廳查看餐廳詳細資料，如地址、電話、簡介、圖片。

3.使用者可以依照中文、類別搜尋餐廳。

4.使用者可以編輯任一餐廳資料。

5.使用者可以刪除任一餐廳。

6.使用者可以新增餐廳資料。

7.使用者可透過詳細頁面連結到google-map查看餐廳位置。

8.使用者可以根據A-Z、Z-A、類別、地區、評分進行排序，對於搜尋結果也可以進行排序。

9.使用者可以註冊帳號

10.使用者可以登入/登出並且登入狀態下可以管理個人餐廳清單

11.使用者可以透過第三方FB進行登入

Environment SetUp - 環境建置
-----
1. [Node.js](https://nodejs.org/en/)
2. [MongoDB](https://www.mongodb.com/)

Installing - 專案安裝流程
----
1.打開你的 terminal，Clone 此專案至本機電腦

    git clone https://github.com/CHUCHUDAN/restaurant_list_login.git
    
2.開啟終端機(Terminal)，進入存放此專案的資料夾

    cd restaurant_list_login
    
3.安裝 express 套件

    在 Terminal 輸入 npm i express 指令
    
4.安裝nodemon套件
    
    在 Terminal 輸入 npm install nodemon 指令
    
5.請自行新增.env檔案放置與檔案相關的敏感資訊可參考.env.example檔案內容

    MONGODB_URI= "您的MongoDB連線資訊"
    FACEBOOK_ID="您的FB_ID"
    FACEBOOK_SECRET="您的FB密鑰"
    FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
    SESSION_SECRET=ThisIsMySecret
    PORT=3000
    
6.啟動伺服器
  
    在 Terminal 輸入 npm run dev 指令
    
7.當 terminal 出現以下字樣，表示伺服器啟動成功並與資料庫連線成功

    The web is Listen on http://localhost:3000
    Mongodb connected!
    
8.如需使用種子資料請輸入指令

    在 Terminal 輸入 npm run seed 指令
    
Contributor - 專案開發人員
-----
[Daniel Chu](https://github.com/CHUCHUDAN)
