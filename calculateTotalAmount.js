const calculateTotalAmount = (defaultRecords) => {
  let totalAmount = 0
  for (let defaultRecord of defaultRecords) {
    totalAmount += defaultRecord.amount
  }
  return totalAmount
}

module.exports = calculateTotalAmount