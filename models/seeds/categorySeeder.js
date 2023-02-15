const Category = require('../category') // Schema
const db = require('../../config/mongoose')
const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

db.once('open', () => {
  const categories = Object.entries(CATEGORY)
  for (let category of categories) {
    Category.create({ name: category[0], icon: category[1] })
  }
  console.log('done.')
})