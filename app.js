//引入express框架
const express = require('express')
const app = express()

//設定埠號
const port = 3000

//引入handlebars
const exphbs = require('express-handlebars')

//引入session
const session = require('express-session')


//引入method-override
const methodOverride = require('method-override')


//引入router
const routes = require('./routes')

//引入body-parser
const bodyParser = require('body-parser')



//引入mongoose模組
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 express.static 進行前置處理
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