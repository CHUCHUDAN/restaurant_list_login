const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

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