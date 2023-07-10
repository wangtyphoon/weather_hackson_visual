export default function drawscatter(specificIndustry){
    // 创建单选按钮容器  
    let bottomContainer = d3.select('.bottom-container')
    let radioContainerX = bottomContainer.append("div")
    .style('position', 'fixed')
    .style('top', '2%')
    .style('left', '70%');
    bottomContainer.append("div")
    .text("橫軸")
    .style('position', 'fixed')
    .style('font-size', "16px")
    .style('top', '2%')
    .style('left', "68%")
    .style('font-family', 'Arial'); // 设置字体样式，例如 Arial
    // 添加单选按钮 A
    radioContainerX.append("input")
    .attr("type", "radio")
    .attr("id", "radioa")
    .attr("name", "myRadioButtonsX"); // 设置相同的 name 属性
    radioContainerX.append("label")
    .attr("for", "radioa")
    .text("營收");

    // 添加单选按钮 B
    radioContainerX.append("input")
    .attr("type", "radio")
    .attr("id", "radiob")
    .attr("name", "myRadioButtonsX"); // 设置相同的 name 属性
    radioContainerX.append("label")
    .attr("for", "radiob")
    .text("淨利");

    // 添加单选按钮 C
    radioContainerX.append("input")
    .attr("type", "radio")
    .attr("id", "radioc")
    .attr("name", "myRadioButtonsX"); // 设置相同的 name 属性
    radioContainerX.append("label")
    .attr("for", "radioc")
    .text("資本支出");

    bottomContainer.append("div")
    .text("縱軸")
    .style('position', 'fixed')
    .style('font-size', "16px")
    .style('top', '5%')
    .style('left', "68%")
    .style('font-family', 'Arial'); // 设置字体样式，例如 Arial

    let radioContainerY = bottomContainer.append("div")
    .style('position', 'fixed')
    .style('top', '5%')
    .style('left', '70%');
    // 添加单选按钮 A

    radioContainerY.append("input")
    .attr("type", "radio")
    .attr("id", "radioA")
    .attr("name", "myRadioButtonsY"); // 设置相同的 name 属性
    radioContainerY.append("label")
    .attr("for", "radioA")
    .text("碳排");

    // 添加单选按钮 B
    radioContainerY.append("input")
    .attr("type", "radio")
    .attr("id", "radioB")
    .attr("name", "myRadioButtonsY"); // 设置相同的 name 属性
    radioContainerY.append("label")
    .attr("for", "radioB")
    .text("用電量");

    // 添加单选按钮 C
    radioContainerY.append("input")
    .attr("type", "radio")
    .attr("id", "radioC")
    .attr("name", "myRadioButtonsY"); // 设置相同的 name 属性
    radioContainerY.append("label")
    .attr("for", "radioC")
    .text("用水量");

    // 添加单选按钮 C
    radioContainerY.append("input")
    .attr("type", "radio")
    .attr("id", "radioD")
    .attr("name", "myRadioButtonsY"); // 设置相同的 name 属性
    radioContainerY.append("label")
    .attr("for", "radioD")
    .text("一般廢棄物");

    // 添加单选按钮 E
    radioContainerY.append("input")
    .attr("type", "radio")
    .attr("id", "radioE")
    .attr("name", "myRadioButtonsY"); // 设置相同的 name 属性
    radioContainerY.append("label")
    .attr("for", "radioE")
    .text("有害廢棄物");

  const parseNA = string => (string === 'nan' ? '0' : string);

  function nan(d) {
    return {
      '行業': parseNA(d['產業類別']), // 將屬性 category 的值進行 parseNA 轉換
      '公司': parseNA(d['公司名稱']+parseNA(d['股票代碼'])), 
      '2020營收': parseNA(d['2020營收']), 
      '2020淨利': parseNA(d['2020淨利(稅前)']), 
      '2020資本支出': parseNA(d['2020資本支出']), 
      '2021營收': parseNA(d['2021營收']), 
      '2021淨利': parseNA(d['2021淨利(稅前)']), 
      '2021資本支出': parseNA(d['2021資本支出']), 
      '2020碳排':Number(parseNA(d['2020範疇一']).replace(/,/g, ''))+Number(parseNA(d['2020範疇二']).replace(/,/g, '')),
      '2020範疇三':parseNA(d['2020範疇三']).replace(/,/g, ''),
      '2021碳排':Number(parseNA(d['2021範疇一']).replace(/,/g, ''))+Number(parseNA(d['2021範疇二']).replace(/,/g, '')),
      '2021範疇三':parseNA(d['2021範疇三']).replace(/,/g, ''),
      '2020用電量':parseNA(d['2020能源使用']),
      '2021用電量':parseNA(d['2021能源使用']),
      '2020用水量':parseNA(d['2020用水量(t)']),
      '2021用水量':parseNA(d['2021用水量(t)']),
      '2020一般廢棄物':parseNA(d['2020廢棄物產生量']),
      '2021一般廢棄物':parseNA(d['2021廢棄物產生量']),
      '2020有害廢棄物'  :parseNA(d['2020有害廢棄物產生量']),
      '2021有害廢棄物'  :parseNA(d['2021有害廢棄物產生量']),
    };
  }
  
  d3.csv('example-Carbon.csv', nan).then(scatterdata => {
    // console.log('local csv', scatterdata); // 在控制台輸出從 CSV 檔案讀取的資料的第一個物件
    setupscatter(scatterdata,specificIndustry); // 调用 setupstackbarmap 函数，传入读取的数据和特定行业参数
  });
}


function setupscatter(data,specificIndustry){  
  let xkey = '營收';//x軸關鍵字
  let ykey = '碳排';//y軸關鍵字
  let result = update(data,xkey,ykey)
  drawplot(result,xkey,ykey,specificIndustry)
  d3.selectAll("input[type='radio']")
  .on("change", function() {
    // 获取关联标签的文本内容
    let labelText = d3.select("label[for='" + this.id + "']").text();
    // 更改橫軸或縱軸的關鍵字
    if (this.name ==  "myRadioButtonsX"){  //橫軸
        xkey= labelText
        result = update(data,xkey,ykey)
        drawplot(result,xkey,ykey,specificIndustry)
    }
    else if (this.name ==  "myRadioButtonsY"){ //縱軸
        ykey= labelText
        result = update(data,xkey,ykey)
        drawplot(result,xkey,ykey,specificIndustry)
    }
  });
  function update(data, xkey, ykey) {
    // 创建一个包含2020年数据的对象数组
    let res2020 = data.map(item => ({
      '公司': item['公司'], // 公司名称
      '行業': item['行業'], // 行业
      '年分': 2020, // 年份
      'x': Number(item['2020' + xkey].replace(/,/g, '')), // x 值，将属性值转换为数字
      'y': Number(item['2020' + ykey]) // y 值
    }));
  
    // 创建一个包含2021年数据的对象数组
    let res2021 = data.map(item => ({
      '公司': item['公司'], // 公司名称
      '行業': item['行業'], // 行业
      '年分': 2021, // 年份
      'x': Number(item['2021' + xkey].replace(/,/g, '')), // x 值，将属性值转换为数字
      'y': Number(item['2021' + ykey]) // y 值
    }));
  
    // 将2020年和2021年的数据合并为一个数组
    let result = res2020.concat(res2021);
    return result;
  }  
}

function drawplot(data,xkey,ykey,specificIndustry){
  d3.selectAll('#scatter').remove(); // 清除旧图
  
  let scatterContainer = d3.select("body > div.stackbar-chart-container");
    
  const width = document.body.clientWidth*0.39; // 设置画布宽度为一半
  const height = 600; // 设置画布高度为 600 像素
  const chart_margin = { top: 40, right: 40, bottom: 40, left: 40 }; // 设置图表的边距，包含上、右、下、左四个方向的边距值
  const chart_width = width - (chart_margin.left + chart_margin.right); // 计算图表的宽度，即画布宽度减去左右边距
  const chart_height = height - (chart_margin.top + chart_margin.bottom); // 计算图表的高度，即画布高度减去上下边距

  const svg = scatterContainer
  .append('svg') // 创建 svg 元素
  .attr("id", "scatter") // 設定獨特的 ID
  .attr('width', width) // 设置 svg 元素的宽度
  .attr('height', height) // 设置 svg 元素的高度
  .attr('transform', `translate(${chart_margin.left},${chart_margin.top})`);//平移SVG元素

  if (d3.min(data, d => d.x) < 0) {
    const xOffset = Math.abs(d3.min(data, d => d.x)) + 1;

    data.forEach(d => {
        d.x += xOffset; // 將負數 x 值加上偏移量
    })
     // 添加文字方塊標記 x 軸偏移量
    svg.append("text")
    .attr("x", width / 2) // 在圖表水平中心位置
    .attr("y", 20) // 在圖表上方偏移 20 個單位
    .text(`x 軸偏移量為+ ${Math.round(xOffset/10000)}萬元`)
    .attr("font-size", 12)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle");
  }
  
  data = data.map(d => {
    if (d.x === 0) {
      return { ...d, x: 1 }; // 使用对象展开运算符 (...) 创建一个新对象，并将 x 属性值更新为 1
    } else {
      return d; // 对于其他属性值不为 0 的数据，保持原样
    }
  });
  data = data.map(d => {
    if (d.y === 0) {
      return { ...d, y: 1 }; // 使用对象展开运算符 (...) 创建一个新对象，并将 x 属性值更新为 1
    } else {
      return d; // 对于其他属性值不为 0 的数据，保持原样
    }
  });
  
  const xScale = d3.scaleLog() // 创建对数比例尺
    .base(Math.sqrt(10)) // 设置底数为 10
    .domain(d3.extent(data.map(d => d.x)))
    .range([40, chart_width ]);
  const yScale = d3.scaleLog() // 创建对数比例尺
    .base(Math.sqrt(10)) // 设置底数为 10
    .domain(d3.extent(data.map(d => d.y)))
    .range([chart_height, 40]);

  // 增加圖例標示年份和顏色的變化
const legend = svg.append("g")
.attr("class", "legend")
.attr("transform", `translate(${chart_width-20}, ${chart_height-30})`); // 設定圖例位置

// 添加年份圖例
legend.append("text")
.attr("x", 20)
.attr("y", -20)
.text("年份")
.attr("font-size", 12)
.attr("fill", "black")
.attr("text-anchor", "start")
.attr("alignment-baseline", "middle");

// 添加年份和顏色示意圖
const legendItems = legend.selectAll(".legend-item")
.data([2020, 2021])
.enter()
.append("g")
.attr("class", "legend-item")
.attr("transform", (d, i) => `translate(0, ${i * 20})`); // 設定每個圖例項目的位置

// 添加年份示意圖
legendItems.append("text")
.attr("x", 20)
.attr("y", 0)
.text(d => d)
.attr("font-size", 12)
.attr("fill", "black")
.attr("text-anchor", "start")
.attr("alignment-baseline", "middle");

// 添加顏色示意圖
legendItems.append("rect")
.attr("x", 60)
.attr("y", -6)
.attr("width", 12)
.attr("height", 12)
.attr("fill", d => {
  if (d === 2020) {
    return "#00BFFF"; // 如果年分為 2020，設定為 steelblue 颜色
  } else if (d === 2021) {
    return "#00FF00"; // 如果年分為 2021，設定為 green 颜色
  } else {
    return "red"; // 其他情況，設定為 red 颜色
  }
});
  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 10)
    .attr("stroke", d => {
      if (d.年分 === 2020) {
        return "#00BFFF"; // 如果年分为 2020，设置为 steelblue 颜色
      } else if (d.年分 === 2021) {
        return "#00FF00"// 如果年分为 2021，设置为 green 颜色
      } else {
        return "red"; // 其他情况，设置为 red 颜色
      }
    })
    .attr("stroke-width", 2)
    .attr("fill" ,d => {
      if (d.行業 === specificIndustry) {
        if (d.年分 === 2020) {
          return "#00BFFF"; // 如果年分为 2020，设置为 steelblue 颜色
        } else if (d.年分 === 2021) {
          return "#00FF00"; // 如果年分为 2021，设置为 green 颜色
        } else {
          return "red"; // 其他情况，设置为 red 颜色
        }
      } else {
        return "white"; // 其他情况，设置为 red 颜色
      }
    })
    .on("mouseover", (event, d) => {
      d3.select(event.currentTarget).attr("r", 20); // 使用 event.currentTarget 代替 this
    
      // 顯示文字方塊
      svg.append("text")
        .attr("id", "mouse-text") // 設定獨特的 ID
        .attr("x", xScale(d.x) + 10) // 在原點右側 10 個單位處顯示文字方塊
        .attr("y", yScale(d.y))
        .text(d.公司)
        .attr("font-size", 12)
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle")
        .attr("pointer-events", "none"); // 避免文字方塊擋住滑鼠事件
    })
    .on("mouseout", (event) => {
      d3.select(event.currentTarget).attr("r", 10); // 滑鼠離開時恢復原始半徑
    
      // 移除文字方塊
      d3.select("#mouse-text").remove();
    });
    

    // 添加 x 轴
    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${chart_height})`) // 将 x 轴放置在图表底部
    .call(d3.axisBottom(xScale).ticks(10, ".2s")); // 使用比例尺绘制 x 轴刻度

    // 添加 y 轴
    svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${chart_margin.left}, 0)`) // 将 y 轴放置在图表左侧
    .call(d3.axisLeft(yScale).ticks(10, ".2s")); // 使用比例尺绘制 y 轴刻度

    svg.append("g")
    .selectAll("line")
    .data(xScale.ticks())
    .join("line")
    .attr("x1", d => xScale(d))
    .attr("y1", chart_margin.top)
    .attr("x2", d => xScale(d))
    .attr("y2", chart_height)
    .attr("stroke", "lightgray")
    .attr("stroke-width", 0.5)
    .attr("stroke-dasharray", "3 3");
  
  // 添加 y 轴网格线
  svg.append("g")
    .selectAll("line")
    .data(yScale.ticks())
    .join("line")
    .attr("x1", chart_margin.left)
    .attr("y1", d => yScale(d))
    .attr("x2", chart_width)
    .attr("y2", d => yScale(d))
    .attr("stroke", "lightgray")
    .attr("stroke-width", 0.5)
    .attr("stroke-dasharray", "3 3");
  
  // 添加 X 轴标题
  svg.append("text")
    .attr("x", chart_width+chart_margin.right/2+10 ) // x 坐标为图表宽度的一半，使标题居中
    .attr("y", chart_height ) // y 坐标为图表高度加上顶部边距和一定的偏移量
    .text(xkey)
    .attr("fill", "black") // 文字颜色为黑色
    .attr("text-anchor", "middle") // 文字水平对齐方式为居中对齐
    .attr("dominant-baseline", "hanging") // 文字垂直对齐方式为悬挂对齐
    .style("font-size", "16px"); // 文字字体大小为 12px

  // 添加 Y 轴标题
  svg.append("text")
    .attr("x", chart_margin.left) // x 坐标为负的图表高度的一半，使标题居中
    .attr("y",chart_margin.top/2) // y 坐标为负的左边距和一定的偏移量
    .text(ykey)
    .attr("fill", "black") // 文字颜色为黑色
    .attr("text-anchor", "middle") // 文字水平对齐方式为居中对齐
    .attr("dominant-baseline", "hanging") // 文字垂直对齐方式为悬挂对齐
    .style("font-size", "16px"); // 文字字体大小为 12px

const regressionLine = svg
  .append("line")
  .attr("x1", xScale(d3.min(data, d => d.x)))
  .attr("y1", yScale(d3.min(data, d => d.y)))
  .attr("x2", xScale(d3.max(data, d => d.x)))
  .attr("y2", yScale(d3.max(data, d => d.y)))
  .attr("stroke", "red")
  .attr("stroke-width", 1.5)
  .attr("fill", "none");

// 在右下角添加佳的文字
svg.append("text")
  .attr("x", chart_width - 10) // x 坐标为图表宽度减去一定的偏移量，使文字靠近右边界
  .attr("y", chart_height - 10) // y 坐标为图表高度减去一定的偏移量，使文字靠近底部
  .text("ESG")
  .attr("fill", "green") // 文字颜色为红色
  .attr("text-anchor", "end") // 文字水平对齐方式为右对齐
  .attr("dominant-baseline", "baseline") // 文字垂直对齐方式为基线对齐
  .style("font-size", "24px"); // 文字字体大小为 16px

}