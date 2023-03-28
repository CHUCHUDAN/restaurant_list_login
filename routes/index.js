//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

const home = require("./modules/home")
const rests = require('./modules/rests')
const searchSort = require('./modules/searchSort')
const users = require('./modules/users')

router.use('/', home)
router.use('/rests', rests)
router.use('/searchSort', searchSort)
router.use('/users', users)

module.exports = router