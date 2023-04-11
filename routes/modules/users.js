const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//登入功能
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))


//登出功能
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已登出')
  res.redirect('/users/login')
})

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '信箱及密碼欄位皆為必填!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({message: 'Email已註冊'})
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => {
          return bcrypt.hash(password, salt)
        })
        .then(hash => {
          return User.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => {
          req.flash('success_msg', '註冊成功')
          res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log('error'))
})

module.exports = router