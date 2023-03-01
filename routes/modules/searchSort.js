//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入data.js共同資料檔案
const data = require('./data.js')
//引入Rest
const Rest = require('../../models/rest')




//排序及搜尋路由
// router.get('/', (req, res) => {
//   let keywords = req.query.keyword
//   let word = req.query.word
//   if (word === undefined) {
//     data.searchKeyword = keywords //儲存關鍵字
//     data.searchState = 'Y' //將搜尋狀態打開
//     if (!keywords) return res.redirect('/')
//     const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
//     Rest.find({
//       $or: [
//         { name: regexTerm },
//         { category: regexTerm }
//       ]
//     })
//       .lean()
//       .then(rests => {
//         if (rests.length === 0) return res.render('noresult', { keywords })
//         res.render('index', { rests, keywords })
//       })
//       .catch(error => console.error(error))
//     return
//   }
//   word = word.split(',')
//   const sortType = word[0]
//   const sortOrder = word[1];
//   const sortOption = {};
//   sortOption[sortType] = sortOrder;
//   if (data.searchState === 'N') {
//     Rest.find()
//       .lean()
//       .sort(sortOption)
//       .then(rests => res.render('index', { rests }))
//       .catch(error => console.log(error))
//     return
//   }
//   keywords = data.searchKeyword  //取得關鍵字
//   const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
//   Rest.find({
//     $or: [
//       { name: regexTerm },
//       { category: regexTerm }
//     ]
//   })
//     .lean()
//     .sort(sortOption)
//     .then(rests => {
//       if (rests.length === 0) return res.render('noresult', { keywords })
//       res.render('index', { rests, keywords })
//     })
//     .catch(error => console.error(error))
// })


function fix(res, regexTerm, keywords, sortOption) {
  Rest.find({
    $or: [
      { name: regexTerm },
      { category: regexTerm }
    ]
  })
    .lean()
    .sort(sortOption)
    .then(rests => {
      if (rests.length === 0) return res.render('noresult', { keywords })
      res.render('index', { rests, keywords })
    })
    .catch(error => console.error(error))
}


//排序及搜尋路由
router.get('/', (req, res) => {
  let keywords = req.query.keyword
  const word = req.query.word
  //如果word型別為undefined，fixWord其值為'_id,asc'否則為req.query.word
  let fixWord = (typeof word === "undefined") ? '_id,asc' : req.query.word;
  fixWord = fixWord.split(',')
  const sortType = fixWord[0]
  const sortOrder = fixWord[1];
  const sortOption = {};
  sortOption[sortType] = sortOrder;
  if (keywords !== undefined) {
    const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
    fix(res, regexTerm, keywords, sortOption)
    data.searchKeyword = keywords
    return
  } else if (data.searchKeyword !== 'null') {
    keywords = data.searchKeyword
    const regexTerm = new RegExp(keywords, 'i'); // 不區分大小寫的正則表達式
    fix(res, regexTerm, keywords, sortOption)
    return
  }
  Rest.find()
    .lean()
    .sort(sortOption)
    .then(rests => {
      return res.render('index', { rests })
    })
    .catch(error => console.log(error))
})

module.exports = router
