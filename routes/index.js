//引入express框架並使用Rounter()函式
const express = require('express')
const router = express.Router()

const home = require("./modules/home")
const rests = require('./modules/rests')
const search = require('./modules/search')

router.use('/', home)
router.use('/rests', rests)
router.use('/search', search)

module.exports = router