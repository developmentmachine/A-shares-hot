/**
 * A股热门板块市场数据可视化
 */

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
          text: title,
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '市值 (亿元)'
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
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
          text: 'A股热门板块市值占比',
          font: {
            size: 18,
            weight: 'bold'
          }
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
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

/**
 * 绘制龙头企业市值变化趋势图
 * @param {string} canvasId - Canvas元素ID
 */
function drawLeadingCompanyTrendChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: '贵州茅台',
          data: [14532, 16843, 19254, 20587, 21768],
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false
        },
        {
          label: '工商银行',
          data: [19435, 18742, 20156, 20876, 21435],
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false
        },
        {
          label: '中芯国际',
          data: [432, 675, 946, 1105, 1236],
          borderColor: 'rgba(255, 206, 86, 1)',
          fill: false
        },
        {
          label: '机器人',
          data: [165, 214, 275, 342, 385],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '各板块龙头企业市值变化趋势(亿元)',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: '市值 (亿元)'
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

  // 绘制龙头企业市值变化趋势
  drawLeadingCompanyTrendChart('trendChart');
};
