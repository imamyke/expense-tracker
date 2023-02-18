const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record') // Schema
const User = require('../user')
const Category = require('../category')

let SEED_USER = []
for (let i = 1; i < 3; i++) {
  const users = {
    name: `User${i}`,
    email: `user${i}@example.com`,
    password: '12345678'
  }
  SEED_USER.push(users)
}

const date = new Date()
let SEED_RECORD = {
  name: '晚餐',
  date: date,
  amount: 100,
  category: '餐飲食品'
}

let userId = ''
let categoryId = ''

Category.find()
  .lean()
  .then(categories => {
    const selectedCategory = categories.find(category => category.name === SEED_RECORD.category)
    categoryId = selectedCategory._id
  })
  
// Mongoose(資料庫)連線 => 產生種子資料
const db = require('../../config/mongoose')
db.once('open', () => {
  const recordSeeder = (user, record) => {
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
    })
    .then(() => {
      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => Record.create({ ...record, userId, categoryId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
  }

  recordSeeder(SEED_USER[0], SEED_RECORD)
})


