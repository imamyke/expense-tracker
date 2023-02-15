    // 1. 要做 chart 的 handlebars
    // 2. google 串接 => medium
    
const ctx = document.getElementById('myChart');
ctx.parentNode.style.height = '300px';
ctx.parentNode.style.width = '300px';

new Chart(ctx, {
  type: 'doughnut',  //圖表類型
  data: {
    // 標籤
    labels: ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他', 'Orange'],
    datasets: [{
      // 標題
      label: '# of Votes',
      // 資料
      data: [12, 19, 3, 5, 2, 3],
      //圖表背景色
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      //圖表外框線色
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      // 外框線寬度
      borderWidth: 1
    }]
  }
});