//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()


//引入Rest
const Rest = require('../../models/rest')

//首頁render mongodb資料
router.get('/', (req, res) => {
  const userId = req.user._id
  Rest.find({ userId })
    .lean()
    .then(rests => res.render('index', { rests}))
    .catch(error => console.error(error))
})

module.exports = router