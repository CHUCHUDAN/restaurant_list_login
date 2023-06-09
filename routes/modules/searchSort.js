//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入Rest
const Rest = require('../../models/rest')

//排序及搜尋路由
router.get('/', (req, res) => {
  let keywords = req.query.keywords
  let sort = req.query.sort || '_id,asc'
  sort = fixSortWord(sort)
  const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
  const userId = req.user._id
  if (keywords === undefined) {
    return Rest.find({ userId })
      .lean()
      .sort([sort])
      .then(rests => {
        res.render('index', { rests })
      })
      .catch(err => console.log(err))
  }
  keywords = keywords.trim()
  fix(res, regexTerm, keywords, sort, userId)
})


function fix(res, regexTerm, keywords, sort, userId) {
  if (keywords === '') return res.redirect('/')
  Rest.find({
    $and: [
      {
        $or: [
          { name: regexTerm },
          { category: regexTerm },

        ]
      },
      {
        $or: [
          { userId }
        ]
      }
    ]
  })
    .lean()
    .sort([sort])
    .then(rests => {
      if (rests.length === 0) return res.render('noresult', { keywords })
      res.render('index', { rests, keywords })
    })
    .catch(error => console.error(error))
}

function fixSortWord(word) {
  const array = word.split(',')
  const sortKey = array[0]
  const sortValue = array[1]
  return [sortKey, sortValue]
}


module.exports = router
