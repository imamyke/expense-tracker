const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

// 載入路由分類
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use('/expenses', authenticator, expenses)
router.use('/users', users)
// router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/', home)

module.exports = router