const dateFormat = (date) => {
  let formattedDate = `${ date.getFullYear() }`+`.${ date.getMonth() + 1 }`+`.${ date.getDate() }`
  return formattedDate;
}

module.exports = dateFormat