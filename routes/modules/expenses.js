const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dateValue = require('../../dateValue')

// 新增
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  let categoryId = ''
  Category.find()
    .lean()
    .then(categories => {
      const record = req.body
      const errors = []
      const keySelected = Object.entries(categories).find(category => category[1].name === record.category)
      if (!record.name || !record.date || !keySelected || !record.amount) {
        if (!keySelected) {
          errors.push({ message: '請確認欄位已確實填寫完畢!' })
          return res.render('new', { record , errors, keySelected: false })
        }
        errors.push({ message: '請確認欄位已確實填寫完畢!' })
        return res.render('new', { record , errors, keySelected: keySelected[1].name })
      }
      categoryId = keySelected[1]._id
      return Record.create({ ...record, categoryId, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
// 編輯
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .lean() 
    .then(record => {
      // 轉換日期格式
      const recordDate = dateValue(record.date)
      record.date = recordDate
      // 導入類別
      Category.find()
        .lean()
        .then(categories => {
          const keySelected = Object.entries(categories).find(category => category[1].name === record.category)
          res.render('edit', { _id , record, keySelected: keySelected[1].name })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const _id = req.params.id 
  const userId = req.user._id
  Category.find()
      .lean()
      .then(categories => {
          const record = req.body
          const errors = []
          const keySelected = Object.entries(categories).find(category => category[1].name === record.category)
          if (!record.name || !record.date || !keySelected || !record.amount) {
            // 導入類別
            if (!keySelected) {
              errors.push({ message: '請確認欄位已確實填寫完畢!' })
              return res.render('edit', { _id , record, errors, keySelected: false })
            }
            errors.push({ message: '請確認欄位已確實填寫完畢!' })
            return res.render('edit', { _id ,record, errors, keySelected: keySelected[1].name })
          }
        return Record.findOneAndUpdate({ _id, userId }, record)
                .then(() => res.redirect('/'))
                .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
})

// 刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router