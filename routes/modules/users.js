const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')

//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//登入功能
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//登出功能
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('user has already exists')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        User.create({ name, email, password })
          .then(res.redirect('/'))
          .catch(err => console.log('error'))
      }
    })
    .catch(err => console.log('error'))
})

module.exports = router