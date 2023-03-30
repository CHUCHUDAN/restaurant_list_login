//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()
const {authenticator} = require('../middleware/auth')

const home = require("./modules/home")
const rests = require('./modules/rests')
const searchSort = require('./modules/searchSort')
const users = require('./modules/users')
const auth = require('./modules/auth')


router.use('/rests', authenticator, rests)
router.use('/searchSort', authenticator, searchSort)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router