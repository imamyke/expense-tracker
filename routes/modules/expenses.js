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
      const targetCategory = categories.find(category => category.name === req.body.category)
      const errors = []
      const form = req.body
      if (!form.name || !form.date || !targetCategory || !form.date || !form.amount) {
        errors.push({ message: '請確認欄位已確實填寫完畢!' })
        return res.render('new', { ...form, errors})
      }
      categoryId = targetCategory._id
      return Record.create({ ...form, categoryId, userId })
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
      // 導入類別
      const selected = {
            '家居物業': false,
            '交通出行': false,
            '休閒娛樂': false,
            '餐飲食品': false,
            '其他': false,
          }
      const keySelected = Object.keys(selected).find(key => key === record.category)
      selected[`${keySelected}`] = true
      res.render('edit', { record, recordDate, keySelected })
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id 
  return Record.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
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