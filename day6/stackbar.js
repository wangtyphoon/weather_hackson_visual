import homepage from './main.js';  

export default function  barpage(specificIndustry) {
    // 創建底部元素
    var bottomContainer = d3.select("body")
    .append("div")
    .attr("class", "bottom-container");

    // 添加底部按鈕
    bottomContainer.append("button")
    .attr("id", "bottom-button")
    .style("font-size","16px")
    .style("margin-right","10px")
    .text("上一頁")
    .on('click',back);

    var selectElement = bottomContainer.append("select")
    .attr("id", "dropdown");

    const dropdownData = [
        { options: '2020' },
        { options: '2021' }
      ];
    
      // 绑定数据到下拉菜单
    selectElement.selectAll("option")
        .data(dropdownData)
        .enter()
        .append("option")
        .text(function (d) { return d.options; })
        .style('position', 'fixed')
        .style('font-size',"16px")
        .style('top', '50px')
        .style('left', "50px");
      
      // 選擇下拉菜單的容器元素，並設置樣式
      // 創建 stackbar-chart-container 元素
      var barChartContainer = d3.select("body")
        .append("div")
        .attr("class", "stackbar-chart-container");
      
      function nan(d) {
        return {
          '行業': parseNA(d['行業']), // 將屬性 category 的值進行 parseNA 轉換
          '公司': parseNA(d['公司']), 
          '2020營收': parseNA(d['2020_營收']), 
          '2020淨利': parseNA(d['2020_淨利']), 
          '2020資本支出': parseNA(d['2020_資本支出']), 
          '2021營收': parseNA(d['2021_營收']), 
          '2021淨利': parseNA(d['2021_淨利']), 
          '2021資本支出': parseNA(d['2021_資本支出']), 
        };
      }
        // 定義解析 'NA' 字串的函數，將其轉換為 undefined
      const parseNA = string => (string === 'NA' ? undefined : string);
      
        // 使用 d3.csv() 方法從 'example.csv' 讀取資料，並在讀取完成後執行指定的回呼函式
      d3.csv('example.csv',nan).then(bardata => {
        //console.log('local csv', bardata); // 在控制台輸出從 CSV 檔案讀取的資料的第一個物件
        setupstackbarmap(bardata,specificIndustry)
      });
};



function setupstackbarmap(data,specificIndustry) {
  // let res = data;
  // let result = update(data, '2020營收'); //預設資料
  // draw(result, '2020 五十大 營收(萬)') //預設繪圖
  // 點擊事件的回呼函式
  function click() {
    let year = this.value; // 獲取下拉選單中被選中的值
    console.log(selectedOptvalue)
    // let title = selectedOptgroup + " 五十大 " + selectedOptvalue+"(萬)"; // 生成標題文字
    let result = update(res, year); // 更新資料
    // draw(result, title); // 繪製圖表
  }

  // 更新資料的函式
  function update(data, keywords,specificIndustry) {
    let result = data.filter(item => item['行業'] === specificIndustry)
    .map(item => ({
      '行業': item['行業'],
      '公司': item['公司'],
      'value': Math.round(Math.abs(Number(item[keywords].replace(/,/g, '')))/10000)// 將特定屬性值進行數值處理
    }));

    return result;
  }

  // 監聽下拉選單的變化事件
  d3.select('#dropdown').on('change', click);
}


function back(){
    d3.selectAll("#bottom-button").remove()
    d3.selectAll(".stackbar-chart-container").remove()
    homepage()
}