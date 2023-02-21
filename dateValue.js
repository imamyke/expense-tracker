const dateValue = (date) => {
  let day = date.getDate()
  let mounth = date.getMonth() + 1
  let year = date.getFullYear()
  let dateValue = ''

  if (day < 10) {
    day = '0'+ day
  }
  if (mounth < 10){
    mounth = '0' + mounth
  }

  dateValue = year + '-' + mounth + '-' + day
  return dateValue
}

module.exports = dateValue