//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入Rest
const Rest = require('../../models/rest')

//首頁 排序 A-Z 
router.get('/A-Z', (req, res) => {
  Rest.find()
    .lean()
    .sort({name: 'asc'})
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
})

//首頁 排序 Z-A
router.get('/Z-A', (req, res) => {
  Rest.find()
    .lean()
    .sort({ name: 'desc' })
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
})

//首頁 排序基於類別
router.get('/category', (req, res) => {
  Rest.find()
    .lean()
    .sort({ category: 'asc' })
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
})

//首頁 排序基於地區
router.get('/location', (req, res) => {
  Rest.find()
    .lean()
    .sort({ location: 'asc' })
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
})

//首頁 排序基於評分
router.get('/rating', (req, res) => {
  Rest.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(rests => res.render('index', { rests }))
    .catch(error => console.error(error))
})

module.exports = router