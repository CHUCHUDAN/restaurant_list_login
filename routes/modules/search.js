//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入Rest
const Rest = require('../../models/rest')

//搜尋功能
router.get('/', (req, res) => {
  const categoryArray = []
  Rest.find()
    .lean()
    .then((rests) => {
      rests.forEach(rest => categoryArray.push(rest.category))
      if (categoryArray.some(item => item.toLowerCase().includes(req.query.keyword.toLowerCase()))) {
        const types = rests.filter(item => item.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
        res.render('index', { rests: types, keyword: req.query.keyword })
      } else {
        const restaurantArray = rests.filter(item => item.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
        res.render('index', { rests: restaurantArray, keyword: req.query.keyword })
      }
    })
})

module.exports = router