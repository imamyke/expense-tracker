const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dateFormat = require('../../dateFormat')
const calculateTotalAmount = require('../../calculateTotalAmount')

// 瀏覽 + 處理 Icon + 計算總金額
router.get('/', (req,res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(defaultRecords => {
      Category.find()
      .lean()
      .then(categories => {
          // 計算總金額
          const totalAmount = calculateTotalAmount(defaultRecords)
          
          // 時間格式轉換 & 處理 Icon
          const records = defaultRecords.map(defaultRecord => {
            const newDate = dateFormat(defaultRecord.date)
            const category = categories.find(category => category.name === defaultRecord.category)
            defaultRecord.date = newDate
            defaultRecord.category = category.icon
            return defaultRecord
          })
          return res.render('index', { records, totalAmount })
      })
      .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

router.get('/category', (req,res) => {
  const category = req.query.category 
  // 若 category 為全部 => 導回首頁
  if(category === 'all') {
    return res.redirect('/')
  }
  const userId = req.user._id
  Record.find({ category, userId })
    .lean() 
    .then(defaultRecords => {
      Category.find()
        .lean()
        .then(categories => {
          // 篩選
          const selected = {
            '家居物業': false,
            '交通出行': false,
            '休閒娛樂': false,
            '餐飲食品': false,
            '其他': false,
          }
          const keySelected = Object.keys(selected).find(key => key === category)
          
          // 計算總金額
          const totalAmount = calculateTotalAmount(defaultRecords)
          
          // 時間格式轉換 & 處理 Icon
          const records = defaultRecords.map(defaultRecord => {
            const newDate = dateFormat(defaultRecord.date)
            const categorySelected = categories.find(category => category.name === defaultRecord.category)
            defaultRecord.date = newDate
            defaultRecord.category = categorySelected.icon
            return defaultRecord
          })
          
          return res.render('index', { records, totalAmount, keySelected })
        })
        .catch(error => console.error(error))
      })
    .catch(error => console.error(error))
})

module.exports = router