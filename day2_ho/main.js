// 定義一個函式 parseNA，用於將字串 'NA' 轉換為 undefined
const parseNA = string => (string === 'NA' ? undefined : string);

// 定義一個函式 nan，將傳入的物件 d 中的特定屬性值進行 parseNA 轉換
function nan(d) {
  return {
    '108': parseNA(d.y108),
    '109': parseNA(d.y109),
    '110': parseNA(d.y110),
  };
}

// 使用 d3.csv() 方法從 '台積電.csv' 讀取資料，並在讀取完成後執行指定的回呼函式
d3.csv('台積電.csv', nan).then(res => {
  console.log('local csv', res[0]);
  setupcanvas(res[0]);
  //debugger;
});

function setupcanvas(bar) {
  const data = [bar.y108, bar.y109, bar.y110]
  const keys = Object.keys(bar)
  const width = 400;
  const height = 500;
  const chart_margin = { top: 80, right: 40, bottom: 40, left: 80 };
  const chart_width = width - (chart_margin.left + chart_margin.right);
  const chart_height = height - (chart_margin.top + chart_margin.bottom);

  const this_svg = d3.select('.bar-chart-container').append('svg')
    .attr('width', width).attr('height', height)
    .append('g')
    .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`);

  const ymax = d3.max([bar.y108, bar.y109, bar.y110]);
  const yscale_v3 = d3.scaleLinear()
    .domain([0, ymax])
    .range([chart_height, 0]);

  const xScale = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, chart_width])
    .paddingInner(0.25);

  const bars = this_svg.selectAll('.bar')
    .data(bar)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('y', 0)
    .attr('x', d => xScale(keys)) // 使用 xScale 函式
    .attr('width', d => yscale_v3(data)) // 使用 yscale_v3 函式
    .attr('height', xScale.bandwidth())
    .style('fill', 'blue'); // 正確的 fill 屬性寫
}