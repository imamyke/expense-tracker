const Record = require('../record') 
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 產生類別種子資料
const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}
const categoryItems = Object.entries(CATEGORY)
for (let category of categoryItems) {
  Category.create({ name: category[0], icon: category[1] })
}

// 產生使用者
let SEED_USER = []
for (let i = 1; i < 3; i++) {
  const users = {
    name: `User${i}`,
    email: `user${i}@example.com`,
    password: '12345678'
  }
  SEED_USER.push(users)
}

// 產生 default users
const date = new Date()
let SEED_RECORD = {
  name: '晚餐',
  date: date,
  amount: 100,
  category: '餐飲食品'
}

// 產生使用者及 record 種子資料
let userId = ''
let categoryId = ''
const db = require('../../config/mongoose')
db.once('open', () => {
  new Promise((resolve, _reject) => {
    Category.find()
      .lean()
      .then(categories => {
        const selectedCategory = categories.find(category => category.name === SEED_RECORD.category)
        categoryId = selectedCategory._id
        return categoryId
      }).then(() => {
        for (const [user_index, user] of Object.entries(SEED_USER) ) {
          console.log(user_index, user);
          bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then(hash => User.create({
            name: user.name,
            email: user.email,
            password: hash
          }))
          .then(user => {
            userId = user._id
            console.log(userId);
            return Record.create({ ...SEED_RECORD, userId, categoryId })
          })
          .then(() => {
            console.log('record done')
            resolve()
          })
        }
      })
    }).then(() => {
      console.log('Yes done.')
      process.exit()
    })
})


