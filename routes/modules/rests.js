//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

//引入Rest
const Rest = require('../../models/rest')

//新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})
//新增餐廳資料功能
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Rest.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//餐廳詳細資料頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Rest.findOne({ _id, userId })
    .lean()
    .then((rest) => res.render('show', { rest }))
    .catch(error => console.log(error))
})

//編輯餐廳資料頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Rest.findOne({ _id, userId })
    .lean()
    .then((rest) => res.render('edit', { rest }))
    .catch(error => console.log(error))
})
//編輯餐廳資料功能
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Rest.findOne({ _id, userId })
    .then((rest) => {
      rest = Object.assign(rest, {
        name,
        name_en,
        category,
        image,
        location,
        phone,
        google_map,
        rating,
        description
      })
      return rest.save()
    })
    .then(() => res.redirect(`/rests/${_id}`))
    .catch(error => console.log(error))
})
//刪除功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Rest.findOne({ _id, userId })
    .then((rest) => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router