const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')  

// login
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
  failureFlash: '請輸入正確的帳號密碼',
}), (req, res) => {
  res.render('login', { error: req.flash('error')})
})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// sign up
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signup', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 建立 error 訊息空陣列
  const errors = []
  // 確認欄位都有填到
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '請確認欄位都已填寫完整' })
  }
  // 密碼與確認密碼是否相符
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('signup', { ...req.body, errors})
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('signup', { ...req.body, errors })
    } 
    // 如果還沒註冊：寫入資料庫
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  })
})


module.exports = router