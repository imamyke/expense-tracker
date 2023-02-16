// 伺服器設定
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT

// 載入 helper
const helpers = require('handlebars-helpers')
const multihelpers = helpers();

// 載入 Session
const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Mongoose(資料庫)連線
require('./config/mongoose')

// 網頁樣板設定
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: multihelpers}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// 載入 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// RESTful API
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// 載入 passport.js
const usePassport = require('./config/passport')
usePassport(app)

// 載入 flash
const flash = require('connect-flash')
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  
  res.locals.warning_msg = req.flash('warning_msg')  
  res.locals.error = req.flash('error')  
  res.locals.select_msg = req.flash('select_msg')
  next()
})

// 總路由
const routers = require('./routes')
app.use(routers)

// 伺服器監聽
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
})
