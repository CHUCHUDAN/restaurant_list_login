//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入data.js共同資料檔案
const data = require('./data.js')
//引入Rest
const Rest = require('../../models/rest')


//分類路由
router.get('/', (req, res) => {
  const word = req.query.word.split(',')
  const sortType = word[0]
  const sortOrder = word[1];
  const sortOption = {};
  sortOption[sortType] = sortOrder;
  if (data.searchState === 'N') {
    Rest.find()
      .lean()
      .sort(sortOption)
      .then(rests => res.render('index', { rests }))
      .catch(error => console.log(error))
    return
  }
  const keywords = data.searchKeyword  //取得關鍵字
  const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
  Rest.find({
    $or: [
      { name: regexTerm },
      { category: regexTerm }
    ]
  })
    .lean()
    .sort(sortOption)
    .then(rests => res.render('index', { rests, keywords }))
    .catch(error => console.error(error))
})

module.exports = router 
