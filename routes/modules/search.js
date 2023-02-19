//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入Rest
const Rest = require('../../models/rest')

//搜尋功能
router.get('/', (req, res) => {
  Rest.find()
    .lean()
    .then((rests) => {
      if (!req.query.keyword) {
        return res.redirect('/')
      }
      const keywords = req.query.keyword
      const keyword = req.query.keyword.trim().toLowerCase()
      const searchResultArray = rests.filter(data => data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword) || data.name_en.toLowerCase().includes(keyword))

      if (searchResultArray.length === 0) {
        return res.render('noresult', { keywords })
      } else {
        return res.render('index', { rests: searchResultArray, keywords })
      }
    })
})

module.exports = router