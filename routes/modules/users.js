const express = require('express')
const router = express.Router()
// const User = require('../../models/user')
// const passport = require('passport')
// const bcrypt = require('bcryptjs')  

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router