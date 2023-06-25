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
//   .range([0, chart_height]);

//   const xScale = d3.scaleBand()
//   .domain(['y108', 'y109', 'y110'])
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