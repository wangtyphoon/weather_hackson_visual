// get csv file
const parseNA = string => (string === 'NA'?undefined:string);

function nan(d){
  return{
    '108':parseNA(d.y108),
    '109':parseNA(d.y109),
    '110':parseNA(d.y110),
  }
}
d3.csv('台積電.csv',nan).then(
  res => {
    console.log('local csv',res[0]);
    setupcanvas(res[0])
    //debugger;
  }
)
function setupcanvas(data){
const width = 400;
const height = 500;
const chart_margin = { top: 80, right: 40, bottom: 40, left: 80 };
const chart_width = width - (chart_margin.left + chart_margin.right);
const chart_height = height - (chart_margin.top + chart_margin.bottom);

const svg = d3.select('.bar-chart-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`);

const keys = Object.keys(data);
const values = Object.values(data).map(d => parseInt(d.replace(',', ''))); // 將數字字串轉換為數字

const yScale = d3.scaleLinear()
  .domain([0, d3.max(values)])
  .range([chart_height, 0]);

const xScale = d3.scaleBand()
  .domain(keys)
  .rangeRound([0, chart_width])
  .padding(0.1);

const bars = svg.selectAll('.bar')
  .data(values)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => xScale(keys[i]))
  .attr('y', d => yScale(d))
  .attr('width', xScale.bandwidth())
  .attr('height', d => chart_height - yScale(d))
  .style('fill', 'blue');

const header = svg.append('g').attr('class','bar-header')
  .attr('transform',`translate(${+chart_margin.top/2},${-chart_margin.right/2})`).append('text');
header.append('tspan').text('營業銷貨收入(億)').style('font-size','2em');

const xAxis=d3.axisBottom(xScale).tickSizeInner(-chart_height).tickSizeOuter(0).tickSize(0);
const xAxisDraw=svg.append('g') .attr('transform', `translate(0, ${chart_height})`) // 將 x 軸向下平移至圖表底部
.attr('class','xaxis').call(xAxis);

const yAxis=d3.axisLeft(yScale).tickSizeInner(-chart_width).tickFormat((y) => (y * 100).toFixed());
const yAxisDraw=svg.append('g').attr('class','yaxis').call(yAxis)
;

yAxisDraw.selectAll('text').attr('dx','-0.6em');
}

// function setupcanvas(bar){
//   const data = [bar.y108,bar.y109,bar.y110]
//   const key = Object.keys(bar)
//   const width = 400;
//   const height = 500;
//   const chart_margin = {top:80,right:40,bottom:40,left:80};
//   const chart_width = width - (chart_margin.left+chart_margin.right);
//   const chart_height = height - (chart_margin.top+chart_margin.bottom);
  
//   const this_svg = d3.select('.bar-chart-container').append('svg')
//   .attr('width', width).attr('height',height)
//   .append('g')
//   .attr('transform',`translate(${chart_margin.left},${chart_margin.top})`);
  
//   const ymax = d3.max([bar.y108, bar.y109, bar.y110]);
//   const yscale_v3 = d3.scaleLinear()
//   .domain([0, ymax])
//   .range([chart_height, 0]);

//   const xScale = d3.scaleBand()
//   .domain(keys)
//   .rangeRound([0, chart_width])
//   .paddingInner(0.25);

//   const bars = this_svg.selectAll('.bar')
//           .data(bar)
//           .enter()
//           .append('rect')
//           .attr('class', 'bar')
//           .attr('y', 0)
//           .attr('x', d => xScale(key)) // 使用 xScale 函式
//           .attr('width', x => yscale_v3(data)) // 使用 yscale_v3 函式
//           .attr('height', xScale.bandwidth())
//           .style('fill', 'blue'); // 正確的 fill 屬性寫
// }
