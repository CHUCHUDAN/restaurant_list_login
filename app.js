//引入express框架
const express = require('express')
const app = express()

//設定埠號
const port = 3000

//引入handlebars
const exphbs = require('express-handlebars')


//引入method-override
const methodOverride = require('method-override')

//引入mongoose
const mongoose = require('mongoose')

//引入router
const routes = require('./routes')

//引入body-parser
const bodyParser = require('body-parser')

//如果是非正式環境，引入dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//運用mongoose跟mongodb連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//取得資料連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('Mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('Mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//每筆request都會先經過method-override處理
app.use(methodOverride('_method'))

//每筆request都會先經過routes處理
app.use(routes)


//啟動並監聽伺服器
app.listen(port, () => {
  console.log(`The web is Listen on http://localhost:${port}`)
})