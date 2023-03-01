//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入data.js共同資料檔案
const data = require('./data.js')

//引入Rest
const Rest = require('../../models/rest')

//首頁render mongodb資料
router.get('/', (req, res) => {
  const name = "dan"
  data.searchKeyword = 'null'
  Rest.find()
    .lean()
    .then(rests => res.render('index', { rests , name}))
    .catch(error => console.error(error))
})

module.exports = router