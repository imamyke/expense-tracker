const dateValue = (date) => {
  let day = date.getDate()
  let mounth = date.getMonth() + 1
  let year = date.getFullYear()
  let formattedDate = ''

  if (day < 10) {
    day = '0'+ day
  }
  if (mounth < 10){
    mounth = '0' + mounth
  }

  formattedDate = year + '-' + mounth + '-' + day
  return formattedDate
}

module.exports = dateValue