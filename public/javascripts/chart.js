const ctx = document.getElementById('myChart');
ctx.parentNode.style.height = '300px';
ctx.parentNode.style.width = '300px';

window.addEventListener('load', (e) => {
  const categories = [
    'fa-house', 
    'fa-van-shuttle', 
    'fa-face-grin-beam', 
    'fa-utensils', 
    'fa-pen'
  ]
  
  let house = 0
  let traffic = 0
  let recreation = 0
  let food = 0
  let other = 0 

  const recordDatas = document.querySelectorAll('.record-data')
  recordDatas.forEach(data => {
    const category = data.children[0].children[0].classList[1]
    const amount = Number(data.children[3].innerText.replace('$', ''))
      if (category === categories[0]) {
        house += amount
      }
      if (category === categories[1]) {
        traffic += amount
      }
      if (category === categories[2]) {
        recreation += amount
      }
      if (category === categories[3]) {
        food += amount
      }
      if (category === categories[4]) {
        other += amount
      }
  })
  const categoryValues = [house, traffic, recreation, food, other]
  const categoryNames = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  
  new Chart(ctx, {
    type: 'doughnut', 
    data: {
      labels: categoryNames,
      datasets: [{
        // title
        label: '總支出',
        // data value
        data: categoryValues,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 2
      }]
    },
  });
})


