const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

const dateFormat = (date) => {
  let formattedDate = `${ date.getFullYear() }`+`.${ date.getMonth() + 1 }`+`.${ date.getDate() }`
  return formattedDate;
}

// 瀏覽 + 處理 Icon + 計算總金額

router.get('/', (req,res) => {
  Record.find()
    .lean()
    .then(defaultRecords => {
      Category.find()
      .lean()
      .then(categories => {
          // 計算總金額
          let totalAmount = 0
          for (let defaultRecord of defaultRecords) {
            totalAmount += defaultRecord.amount
          }
          const records = defaultRecords.map(defaultRecord => {
            // 時間格式轉換
            const newDate = dateFormat(defaultRecord.date)
            // 處理 Icon
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
  Record.find({ category })
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
          selected[`${keySelected}`] = true
          
          // 計算總金額
          let totalAmount = 0
          for (let defaultRecord of defaultRecords) {
            totalAmount += defaultRecord.amount
          }
          const records = defaultRecords.map(defaultRecord => {
            // 時間格式轉換
            const newDate = dateFormat(defaultRecord.date)
            // 處理 Icon
            const categorySelected = categories.find(category => category.name === defaultRecord.category)
            defaultRecord.date = newDate
            defaultRecord.category = categorySelected.icon
            return defaultRecord
          })
          
          return res.render('index', { records, categories, totalAmount, keySelected })
        })
        .catch(error => console.error(error))
      })
    .catch(error => console.error(error))
})

module.exports = router