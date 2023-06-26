// 定義一個函式 parseNA，用於將字串 'NA' 轉換為 undefined
const parseNA = string => (string === 'NA' ? undefined : string);

// 定義一個函式 nan，將傳入的物件 d 中的特定屬性值進行 parseNA 轉換
function nan(d) {
  return {
    '108': parseNA(d.y108), // 將屬性 y108 的值進行 parseNA 轉換
    '109': parseNA(d.y109), // 將屬性 y109 的值進行 parseNA 轉換
    '110': parseNA(d.y110), // 將屬性 y110 的值進行 parseNA 轉換
  };
}

// 使用 d3.csv() 方法從 '台積電.csv' 讀取資料，並在讀取完成後執行指定的回呼函式
d3.csv('台積電.csv', nan).then(res => {
  console.log('local csv', res[0]); // 在控制台輸出從 CSV 檔案讀取的資料的第一個物件
  setupcanvas(res[0]); // 調用 setupcanvas 函式，傳入從 CSV 檔案讀取的資料的第一個物件
  //debugger;
});

// 定義函式 setupcanvas，用於設置畫布
function setupcanvas(data) {
  const width = 400; // 設定畫布的寬度為 400 像素
  const height = 500; // 設定畫布的高度為 500 像素
  const chart_margin = { top: 80, right: 40, bottom: 40, left: 80 }; // 設定圖表的邊距，包含上、右、下、左四個方向的邊距值
  const chart_width = width - (chart_margin.left + chart_margin.right); // 計算圖表的寬度，即畫布寬度減去左右邊距
  const chart_height = height - (chart_margin.top + chart_margin.bottom); // 計算圖表的高度，即畫布高度減去上下邊距

  // 在 class 為 'bar-chart-container' 的元素中創建一個 svg 元素，並設置寬度和高度
  const svg = d3.select('.bar-chart-container')
    .append('svg') // 創建 svg 元素
    .attr('width', width) // 設定 svg 元素的寬度
    .attr('height', height) // 設定 svg 元素的高度
    .append('g') // 在 svg 元素中創建一個 g 元素，用於放置圖表元素
    .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`); // 設定 g 元素的平移位置，以適應圖表邊距

  const keys = Object.keys(data); // 取得資料物件中的屬性名稱，並存放在 keys 陣列中
  const values = Object.values(data).map(d => parseInt(d.replace(',', ''))); // 取得資料物件中的屬性值，並將數字字串轉換為數字

  // 建立 y 軸的線性比例尺，用於將資料值映射到圖表的高度範圍
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(values)]) // 設定縮放域範圍，取最大值為上限
    .range([chart_height, 0]); // 設定輸出範圍，即圖表的高度範圍

  // 建立 x 軸的類別比例尺，用於將資料的鍵值映射到圖表的寬度範圍
  const xScale = d3.scaleBand()
    .domain(keys) // 設定輸入域範圍，即資料的鍵值
    .rangeRound([0, chart_width]) // 設定輸出範圍，即圖表的寬度範圍
    .padding(0.1); // 設定間距，即每個長條之間的間隔

  // 創建長條元素，代表每個資料點的長條
  const bars = svg.selectAll('.bar')
    .data(values) // 綁定資料
    .enter() // 進入選擇集
    .append('rect') // 創建 rect 元素
    .attr('class', 'bar') // 設定長條的 class
    .attr('x', (d, i) => xScale(keys[i])) // 設定長條的 x 座標，根據索引 i 取得對應的鍵值
    .attr('y', d => yScale(d)) // 設定長條的 y 座標，根據資料值取得對應的高度
    .attr('width', xScale.bandwidth()) // 設定長條的寬度
    .attr('height', d => chart_height - yScale(d)) // 設定長條的高度
    .style('fill', 'blue'); // 設定長條的填充顏色為藍色

  // 創建圖表標題
  const header = svg.append('g').attr('class', 'bar-header')
    .attr('transform', `translate(${+chart_margin.top / 2},${-chart_margin.right / 2})`).append('text');
  header.append('tspan').text('營業銷貨收入(億)').style('font-size', '2em');

  // 創建 x 軸
  const xAxis = d3.axisBottom(xScale)
    .tickSizeInner(-chart_height) // 設定內部刻度線的長度
    .tickSizeOuter(0) // 設定外部刻度線的長度
    .tickSize(0); // 設定刻度線的長度為0，即不顯示刻度線
  const xAxisDraw = svg.append('g')
    .attr('transform', `translate(0, ${chart_height})`) // 將 x 軸向下平移至圖表底部
    .attr('class', 'xaxis')
    .call(xAxis); // 呼叫 x 軸生成器

  // 創建 y 軸
  const yAxis = d3.axisLeft(yScale)
    .tickSizeInner(-chart_width) // 設定內部刻度線的長度
    .tickFormat((y) => (y * 10).toFixed()); // 設定刻度標籤的格式，將數字乘以100並取到小數點後的兩位
  const yAxisDraw = svg.append('g')
    .attr('class', 'yaxis')
    .call(yAxis); // 呼叫 y 軸生成器

  yAxisDraw.selectAll('text').attr('dx', '-0.6em'); // 調整 y 軸刻度標籤的位置
}




// 以下為錯誤之程式碼尚待釐清
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
