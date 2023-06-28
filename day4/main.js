// import click from './select.js';
const dropdownData = [
  { label: '2020', options: ['營收', '淨利', '資本支出'] },
  { label: '2021', options: ['營收', '淨利', '資本支出'] }
];

const dropdown = d3.select('#dropdown');

dropdownData.forEach(group => {
  const optgroup = dropdown.append('optgroup').attr('label', group.label);
  
  group.options.forEach(option => {
    optgroup.append('option').attr('value', option).text(option);
  });
});

const parseNA = string => (string === 'NA' ? undefined : string);

// 定義一個函式 nan，將傳入的物件 d 中的特定屬性值進行 parseNA 轉換
function nan(d) {
  return {
    '行業': (d['行業']), // 將屬性 category 的值進行 parseNA 轉換
    '公司': (d['公司']), 
    '2020營收': (d['2020_營收']), 
    '2020淨利': (d['2020_淨利']), 
    '2020資本支出': (d['2020_資本支出']), 
    '2021營收': (d['2021_營收']), 
    '2021淨利': (d['2021_淨利']), 
    '2021資本支出': (d['2021_資本支出']), 
  };
}

// 使用 d3.csv() 方法從 'example.csv' 讀取資料，並在讀取完成後執行指定的回呼函式
d3.csv('example.csv',nan).then(res => {
  console.log('local csv', res); // 在控制台輸出從 CSV 檔案讀取的資料的第一個物件
  setuptreemap(res)

  // 印出轉換後的結果
});
// d3.select('#dropdown').on('change', click);


function setuptreemap(data){
  let initial = '2021營收'
  let res = data
  function click() {
    let selectedOptvalue = this.value;
    let selectedOptgroup = d3.select('#dropdown option:checked').node().parentNode.label;
    let category = selectedOptgroup + selectedOptvalue;
    let result = update(res,category)
    draw(result)
  }
  function update(data, keywords) {
    let result = data.map(item => ({
      '行業': item['行業'],
      '公司': item['公司'],
      'value': Math.abs(Number(item[keywords].replace(/,/g, '')))
    }));
   
    return result;
  }

  d3.select('#dropdown').on('change', click);

}



function draw(res) {
  const width = 800; // 設定畫布的寬度為 800 像素
  const height = 600; // 設定畫布的高度為 600 像素
  const chart_margin = { top: 80, right: 40, bottom: 40, left: 80 }; // 設定圖表的邊距，包含上、右、下、左四個方向的邊距值
  const chart_width = width - (chart_margin.left + chart_margin.right); // 計算圖表的寬度，即畫布寬度減去左右邊距
  const chart_height = height - (chart_margin.top + chart_margin.bottom); // 計算圖表的高度，即畫布高度減去上下邊距

  const svg = d3.selectAll('.bar-chart-container')
    .append('svg') // 創建 svg 元素
    .attr('width', width) // 設定 svg 元素的寬度
    .attr('height', height) // 設定 svg 元素的高度
    .append('g') // 在 svg 元素中創建一個 g 元素，用於放置圖表元素
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`)
    ; // 設定 g 元素的平移位置，以適應圖表邊距

  let groupedData = d3.group(res, function(res) {
    return res.行業; // 根據 category 屬性將資料進行分組
  });


  var root = d3.hierarchy(groupedData).sum(function(d){return d.value});
// 創建層次結構的根節點，使用 d3.hierarchy() 方法將分組後的資料轉換為層次結構的節點
// 使用 sum() 方法將每個節點的值設置為其子節點值的總和
  
  var tiles = root.leaves();
// // 獲取層次結構中的葉子節點，也就是最底層的節點
  var treemap = d3.treemap()
    .size([width - chart_margin.left - chart_margin.right, height - chart_margin.top - chart_margin.bottom])
    .paddingInner(1).paddingTop(10).paddingRight(1).paddingBottom(1).paddingLeft(1).round(true).padding(3);
// // 創建 treemap 函式，設定大小、內部間距和圓角等屬性

  var nodes = treemap(root
                .sum(function(d) { return d.value; })
                .sort(function(a, b) { return b.height - a.height || b.value - a.value; }))
                .descendants();
// // 使用 treemap 函式對根節點進行布局，計算每個節點的位置和大小
// // 使用 sum() 方法重新計算每個節點的值，sort() 方法對節點進行排序，以便更好地展示

  const canvas = svg.selectAll('.g')
                    .data(tiles)
                    .enter()
                    .append('g')
                    .attr('transform',(d)=>
                    {
                      return 'translate('+d['x0']+','+d['y0']+')'
                    });
// // 在 SVG 中創建一個 g 元素群組，用於放置矩形區塊
// // 根據每個節點的位置和大小，將 g 元素進行平移，以適應其在 SVG 中的位置
// // 提取tiles陣列中每個元素的value值，並存儲在values陣列中
  var values = tiles.map(d => d.value);
  console.log(tiles)
// // 使用d3.extent()方法計算values陣列中的最大值和最小值
  var extent = d3.extent(values);

// // 從extent陣列中取得最小值和最大值
  var minValue = extent[0];
  var maxValue = extent[1];
 
// // 創建一個線性比例尺，用於將value值映射到不透明度的範圍
  var opacity = d3.scaleLinear()
      .domain([minValue, maxValue]) // 指定比例尺的範圍
      .range([.5,1]); // 指定對應的不透明度範圍


  canvas.append('rect')
        .attr('class','tiles')
        .attr('fill',(d)=>{
          var cat = d.data['行業'];
          // console.log(cat)
          if (cat === 'computer and peripheral equipment'){
            return 'orange';
          }
          else if(cat === 'plastics'){
            return 'blue';
          }
          else if(cat === 'rubber'){
            return 'red';
          }
          else if(cat === 'other electronics'){
            return 'yellow';
          }
        })
        .attr('name',(d)=>{
          return d['公司'];
        })
        .attr('category',(d)=>{
          return d['行業'];
        })
        .attr('value',(d)=>{
          return d['value'];
        })
        .attr('width',(d)=>{
          return d['x1']-d['x0'];
        })
        .attr('height',(d)=>{
          return d['y1']-d['y0'];
        })
        .attr("opacity",function(d){ return opacity(d.data['value'])}) //矩形透明度
        .attr("stroke", "black")
        .attr("stroke-width", 1) //矩形邊框
        .on("mouseover", function() {
          d3.select(this)
            .transition()
            .duration(200) // 動畫持續時間
            .attr("transform", "scale(1.2)"); // 放大矩形
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200) // 動畫持續時間
            .attr("transform", "scale(1)"); // 還原矩形大小
        });
// // 在 g 元素中創建矩形元素，設定相應的屬性
// // 根據每個節點的分類，設定矩形的填充顏色
// // 將節點的名稱、分類和值等資訊作為屬性存儲在矩形元素中
// // 根據節點的位置和大小，設定矩形的寬度和高度



  // canvas.append('text')
  // .text((d)=>{
  //   return d.data['name'];
  // })
  // .attr('x',5).attr('y',12);
// // 在每個矩形區塊上方添加文字，顯示節點的名稱
// // 設定文字的位置(x, y)

  // canvas.append('text')
  // .text((d)=>{
  //   return d.data['value'];
  // })
  // .attr('x',5)
  // .attr('y',25);
// // 在每個矩形區塊上方添加文字，顯示節點的值
// // 設定文字的位置(x, y)

  // const legendData = [
  // { category: 'h', color: 'orange' },
  // { category: 'a', color: 'blue' },
  // { category: 'other', color: 'yellow' }
  // ];
// // 定義圖例的資料，包括分類和顏色

// const legendWidth = 120;
// const legendHeight = 20;
// const legendMargin = 10;
// // 設定圖例的寬度、高度和間距

// const legend = svg.append('g')
// .attr('class', 'legend')
// .attr('transform', `translate(${width/2 - (legendData.length * (legendWidth + legendMargin))}, ${-chart_margin.top/3})`);
// // 在 SVG 中創建一個 g 元素群組，用於放置圖例
// // 設定圖例的位置，根據畫布的寬度和圖例的寬度、數量計算得出

// const legendItems = legend.selectAll('.legend-item')
// .data(legendData)
// .enter()
// .append('g')
// .attr('class', 'legend-item')
// .attr('transform', (d, i) => `translate(${i * (legendWidth + legendMargin)}, 0)`);
// // 在圖例中創建一個 g 元素群組，用於放置每個圖例項目
// // 根據圖例的數量，設定圖例項目的位置，根據圖例的寬度和間距計算得出

// legendItems.append('rect')
// .attr('x', 0)
// .attr('y', 0)
// .attr('width', legendWidth)
// .attr('height', legendHeight)
// .attr('fill', d => d.color);
// // 在圖例項目中創建矩形元素，設定相應的屬性
// // 根據圖例資料的顏色屬性，設定矩形的填充顏色

// legendItems.append('text')
// .attr('x', legendWidth / 2)
// .attr('y', -5)
// .attr('text-anchor', 'middle')
// .text(d => `Category ${d.category}`);
// // 在圖例項目中添加文字，顯示分類的名稱
// // 設定文字的位置(x, y)，以及對齊方式和文字內容

// svg.append('text')
// .attr('class', 'chart-title')
// .attr('x', chart_width / 2)
// .attr('y', -chart_margin.top / 1.7)
// .attr('text-anchor', 'middle')
// .attr('font-size', '20px')
// .text('Treemap Chart');
// // 在 SVG 中添加一個文字元素，用於標題
// // 設定文字的位置(x, y)，對齊方式，字體大小和文字內容
}

  





 

