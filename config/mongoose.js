// 載入 Mongoose 和 dotenv
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Mongoose (資料庫)連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// 資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error');
})
db.once('open', () => {
  console.log('mongodb connected');
})

module.exports = db
