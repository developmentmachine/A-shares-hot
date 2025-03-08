/**
 * 市场数据可视化脚本
 * 使用 Chart.js 绘制 A 股热门板块企业市值分布图
 */

// 人形机器人概念板块数据
const roboticsData = [
  { name: '机器人', marketCap: 385.6, freeFloat: 342.8 },
  { name: '捷昌驱动', marketCap: 263.7, freeFloat: 195.4 },
  { name: '瀚川智能', marketCap: 185.2, freeFloat: 97.6 },
  { name: '芯原股份', marketCap: 176.8, freeFloat: 86.3 },
  { name: '盈趣科技', marketCap: 168.5, freeFloat: 73.2 },
  { name: '华中数控', marketCap: 145.3, freeFloat: 112.7 },
  { name: '中科创达', marketCap: 143.7, freeFloat: 82.5 },
  { name: '北京君正', marketCap: 131.6, freeFloat: 78.4 },
  { name: '智立方', marketCap: 103.5, freeFloat: 48.7 },
  { name: '派能科技', marketCap: 97.2, freeFloat: 45.3 }
];

// AI和芯片概念板块数据
const aiChipData = [
  { name: '中芯国际', marketCap: 1236.8, freeFloat: 723.5 },
  { name: '科大讯飞', marketCap: 875.4, freeFloat: 634.2 },
  { name: '韦尔股份', marketCap: 743.9, freeFloat: 362.7 },
  { name: '卓胜微', marketCap: 582.6, freeFloat: 247.3 },
  { name: '中微公司', marketCap: 547.3, freeFloat: 215.8 },
  { name: '斯达半导', marketCap: 486.5, freeFloat: 178.4 },
  { name: '寒武纪', marketCap: 437.2, freeFloat: 97.5 },
  { name: '中科创达', marketCap: 422.8, freeFloat: 267.5 },
  { name: '奥特维', marketCap: 184.7, freeFloat: 86.2 },
  { name: '东微半导', marketCap: 173.5, freeFloat: 59.6 }
];

// 银行概念板块数据
const bankData = [
  { name: '工商银行', marketCap: 21435.6, freeFloat: 5623.8 },
  { name: '农业银行', marketCap: 16742.3, freeFloat: 4926.5 },
  { name: '中国银行', marketCap: 14853.7, freeFloat: 4358.2 },
  { name: '建设银行', marketCap: 14321.5, freeFloat: 4267.9 },
  { name: '招商银行', marketCap: 12635.8, freeFloat: 7842.3 },
  { name: '兴业银行', marketCap: 4758.3, freeFloat: 3847.2 },
  { name: '民生银行', marketCap: 3624.7, freeFloat: 2973.5 },
  { name: '交通银行', marketCap: 3562.8, freeFloat: 2140.2 },
  { name: '中信银行', marketCap: 3215.6, freeFloat: 1758.4 },
  { name: '成都银行', marketCap: 586.4, freeFloat: 423.7 }
];

// 白酒概念板块数据
const liquorData = [
  { name: '贵州茅台', marketCap: 21768.5, freeFloat: 5738.4 },
  { name: '五粮液', marketCap: 6324.7, freeFloat: 5213.6 },
  { name: '洋河股份', marketCap: 3756.8, freeFloat: 2853.2 },
  { name: '泸州老窖', marketCap: 2845.3, freeFloat: 2237.6 },
  { name: '山西汾酒', marketCap: 2374.6, freeFloat: 1568.3 },
  { name: '古井贡酒', marketCap: 1536.2, freeFloat: 843.5 },
  { name: '今世缘', marketCap: 758.4, freeFloat: 625.3 },
  { name: '酒鬼酒', marketCap: 746.3, freeFloat: 435.7 },
  { name: '口子窖', marketCap: 592.7, freeFloat: 413.5 },
  { name: '水井坊', marketCap: 547.8, freeFloat: 275.6 }
];

/**
 * 绘制市值对比图
 * @param {string} canvasId - Canvas元素ID
 * @param {Array} data - 公司数据数组
 * @param {string} title - 图表标题
 */
function drawMarketCapChart(canvasId, data, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.name),
      datasets: [
        {
          label: '总市值(亿元)',
          data: data.map(item => item.marketCap),
          backgroundColor: 'rgba(54, 162, 235, 0.8)'
        },
        {
          label: '流通市值(亿元)',
          data: data.map(item => item.freeFloat),
          backgroundColor: 'rgba(255, 99, 132, 0.8)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '市值 (亿元)'
          }
        }
      }
    }
  });
}

/**
 * 绘制各板块龙头企业市值占比饼图
 * @param {string} canvasId - Canvas元素ID
 */
function drawSectorComparisonChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  // 计算各板块龙头企业总市值
  const roboticsTotal = roboticsData.reduce((sum, item) => sum + item.marketCap, 0);
  const aiChipTotal = aiChipData.reduce((sum, item) => sum + item.marketCap, 0);
  const bankTotal = bankData.reduce((sum, item) => sum + item.marketCap, 0);
  const liquorTotal = liquorData.reduce((sum, item) => sum + item.marketCap, 0);
  
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['银行板块', '白酒板块', 'AI和芯片板块', '人形机器人板块'],
      datasets: [{
        data: [bankTotal, liquorTotal, aiChipTotal, roboticsTotal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'A股热门板块市值占比'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw;
              const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value.toLocaleString()} 亿元 (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// 页面加载完成后初始化图表
window.onload = function() {
  // 绘制各板块龙头企业市值对比图
  drawMarketCapChart('roboticsChart', roboticsData, '人形机器人概念板块龙头企业市值对比');
  drawMarketCapChart('aiChipChart', aiChipData, 'AI和芯片概念板块龙头企业市值对比');
  drawMarketCapChart('bankChart', bankData, '银行概念板块龙头企业市值对比');
  drawMarketCapChart('liquorChart', liquorData, '白酒概念板块龙头企业市值对比');
  
  // 绘制板块市值占比饼图
  drawSectorComparisonChart('sectorComparisonChart');
};
