// get csv file
const parseNA = string => (string === 'NA'?undefined:string);

function nan(d){
  return{
    y108:parseNA(d.y108),
    y109:parseNA(d.y109),
    y110:parseNA(d.y110),
  }
}
d3.csv('台積電.csv',nan).then(
  res => {
    console.log('local csv',res[0]);
    setupcanvas(res[0])
    //debugger;
  }
)

function setupcanvas(bar){
  const width = 400;
  const height = 500;
  const chart_margin = {top:80,right:40,bottom:40,left:80};
  const chart_width = width - (chart_margin.left+chart_margin.right);
  const chart_height = height - (chart_margin.top+chart_margin.bottom);
  
  const this_svg = d3.select('.bar-chart-container').append('svg')
  .attr('width', width).attr('height',height)
  .append('g')
  .attr('transform',`translate(${chart_margin.left},${chart_margin.top})`);

  //const flattenedData = barchardata.flat();
  const x = d3.scaleBand()
      .domain([0,chart_width]) // descending frequency
      .range([chart_margin.left, width - chart_margin.right])
      .padding(0.1);
  // console.log(d3.max([bar.y108,bar.y109,bar.y110]))
  const y = d3.scaleLinear()
      .domain([0, d3.max([bar.y108,bar.y109,bar.y110])])
      .range([height - chart_margin.bottom, chart_margin.top]);
  const bars = this_svg.selectAll('.bar')
                        .data([bar.y108,bar.y109,bar.y110])
                        .enter()
                        .append('rect')
                        .attr('class','bar')
                        .attr('y',0).attr('x',d=>x(bar))
                        .attr('width',x=>y(bar))
                        .attr('height',x.bandwidth())
                        .style('fill,blue');
                      }
