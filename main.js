// 1. node models/seeds/recordSeeder.js
const Record = require('../record') // Schema

let SEED_USER = []
for (let i = 1; i < 3; i++) {
  const users = {
    name: `User${i}`,
    email: `user${i}@example.com`,
    password: '12345678'
  }
  SEED_USER.push(users)
}
let user1restaurants = []
for (let i = 0; i < 3; i++) {
  user1restaurants.push(restaurantList.results[i])
}
let user2restaurants = []
for (let i = 3; i < 6; i++) {
  user2restaurants.push(restaurantList.results[i])
}

// Mongoose(資料庫)連線 => 產生種子資料
const db = require('../../config/mongoose')
db.once('open', () => {
  Record.create({  })
    .then(() => {
      console.log('done.')
    })
})

// home.js

// 2. 瀏覽 + 處理 Icon + 計算總金額
// home.js

// 3. 篩選支出類別 + 處理 Icon + 計算總金額
// home.js
router.get('/category', (req,res) => {
  const category = req.query.category 
  // 先把 index 的 <select> 命名為 name="category"
  // category === '家' ? true : false
  Record.find({ category })
    .lean() 
    .then(records => {
      // 計算總金額
      let totalAmount = 0
      for (let record of records) {
        totalAmount += record.amount
      }
      // 處理 Icon
      // ...
      return res.render('index', { records, totalAmount, category })
    })
    .catch(error => console.error(error))
})
