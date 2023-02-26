//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()
//引入data.js共同資料檔案
const data = require('./data.js')
//引入Rest
const Rest = require('../../models/rest')

//搜尋功能
router.get('/', (req, res) => {
  const keywords = req.query.keyword
  const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
  if (!keywords) return res.redirect('/')
  Rest.find({
    $or: [
      { name: regexTerm },
      { category: regexTerm }
    ]
  })
    .lean()
    .then(rests => {
      console.log(rests)
      if (rests.length === 0) return res.render('noresult', { keywords })
      res.render('index', { rests, keywords })
    })
    .catch(error => console.error(error))
  data.searchKeyword = keywords //儲存關鍵字
  data.searchState = 'Y' //將搜尋狀態打開
  return
})

module.exports = router