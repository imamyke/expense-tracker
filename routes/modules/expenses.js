const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// 新增
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  let categoryId = ''
  Category.find()
    .lean()
    .then(categories => {
      const TargetCategory = categories.find(category => category.name === req.body.category)
      categoryId = TargetCategory._id
      console.log(categoryId)
      return Record.create({ ...req.body, categoryId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
// 編輯
router.get('/:id/edit', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id })
    .lean() // 把資料轉換成單純的 "JS 物件"
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id // 字串
  return Record.findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:id', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router