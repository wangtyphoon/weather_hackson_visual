export default function word_cloud(xPos,yPos,company){
    function nan(d) {
      return {
        'E達成': (d['E~達成']), // 将属性 '產業類別' 的值进行转换
        'E目標': (d['E~目標']), // 将属性 '產業類別' 的值进行转换
        '風險': (d['風險']), // 将属性 '產業類別' 的值进行转换
        '重要度'  : Number(d['重要度']),
        'cdp'    : d['CDP'],
        'sbti'   : d['SBTI']
      }
    }
    let path = "csv/"+company.slice(-4)+".csv";
    d3.csv(path,nan).then(words=>{
      // console.log(words)
      drawcloud(xPos,yPos,words,company)
    })
}

function drawcloud(xPos,yPos,words,company){
  // console.log(cdp)
  // 指定新視窗的尺寸和位置
  const cdp = words[0].cdp;
  const sbti = words[0].sbti;
  console.log(cdp)
  const windowWidth = 1080;
  const windowHeight = 1080;
  const windowLeft = window.screenX + xPos;
  const windowTop = window.screenY + yPos;
  // 在指定尺寸和位置創建新視窗
  const newWindow = window.open("", "_blank", `width=${windowWidth}, height=${windowHeight}, left=${windowLeft}, top=${windowTop}`);
  
  const chart_margin = { top: 40, right: 40, bottom: 40, left: 40 }; // 设置图表的边距，包含上、右、下、左四个方向的边距值
  const chart_width = windowWidth - (chart_margin.left + chart_margin.right); // 计算图表的宽度，即画布宽度减去左右边距
  const chart_height = windowHeight - (chart_margin.top + chart_margin.bottom); // 计算图表的高度，即画布高度减去上下边距
  
  // 在新視窗的 head 元素中引入外部 CSS 檔案
  const link = newWindow.document.createElement("link");
  link.rel = "stylesheet";
  link.href = "http://127.0.0.1:5500/style.css"; // 請替換為你的本地 CSS 檔案的路徑
  newWindow.document.head.appendChild(link);
  // 在新視窗內創建一個 <div> 元素，並設置其寬度和高度
  const container = d3.select(newWindow.document.body)
  .append("div")
  .attr("id", "cloudcontainer")
  .style("width", chart_width + "px")
  .style("height", chart_height + "px");

    // 增加標題
  container.append("div")
  .attr("id", "title")
  .style("text-align", "center")
  .style("font-size", "32px")
  .style("font-weight", "bold")
  .text(company+" 風險、目標與成果彙整報告"); // 請替換成你想要的標題文字

  // 副標題
  container.append("div")
    .attr("id", "subtitle")
    .style("text-align", "center")
    .style("font-size", "28px")
    .html("CDP climate change grade: " + cdp + "&nbsp;&nbsp;&nbsp;&nbsp;SBTI target classification: " + sbti);

// 在 <div> 元素中創建一個 SVG 元素
  const svg = container.append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height)
    .style("background-image", "url(http://127.0.0.1:5500/cloud.png)")
    .style("background-size", "800px 800px")
    .style("background-repeat","no-repeat")
    .style("background-position", "60% 60%");

  // 風險插圖
svg.append("image")
.attr("href", "http://127.0.0.1:5500/risk.jpg")
.attr("width", 50)
.attr("height", 50)
.attr("x", 480)
.attr("y", 300);

// 目標插圖
svg.append("image")
.attr("href", "http://127.0.0.1:5500/target.jpg")
.attr("width",50)
.attr("height", 50)
.attr("x", 380)
.attr("y", 360);

// 策略插圖
svg.append("image")
.attr("href", "http://127.0.0.1:5500/strategy.jpg")
.attr("width",50)
.attr("height", 50)
.attr("x", 505)
.attr("y", 415);

    
// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
function createWordCloud(words, color, xPos, yPos) {
  let layout = d3.layout.cloud()
    .size([350, 300])
    .words(words.map(function(d) { return { text: d.text, size: d.size }; }))
    .padding(5) // space between words
    .rotate(0)
    .fontSize(function(d) { return d.size; }) // font size of words
    .on("end", draw);

  layout.start();

  function draw(words) {

    // // 確認文字雲位置
    const cloudWidth = layout.size()[0];
    const cloudHeight = layout.size()[1];

    svg.append("rect")
      .attr("x", xPos - cloudWidth / 2)
      .attr("y", yPos - cloudHeight / 2)
      .attr("width", cloudWidth)
      .attr("height", cloudHeight)
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1);
    svg.append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function(d) { return d.size; })
      .style("fill", color)
      .attr("text-anchor", "middle")
      .style("font-family", "Impact")
      .attr("transform", function(d) {
        return "translate(" + [d.x + xPos, d.y + yPos] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
  }
}

// Usage example for draw1 and draw2
createWordCloud(words.map(function(d) { return { text: d.E達成, size: d.重要度}; }), "#00A86B",600, 430);
createWordCloud(words.map(function(d) { return { text: d.E目標, size: d.重要度 }; }), "#9966CB", 0, 250);
// createWordCloud(words.map(function(d) { return { text: d.轉型風險, size: d.重要度+4 }; }), "#F9A602", 400, -30);
createWordCloud(words.map(function(d) { return { text: d.風險, size: d.重要度 }; }), "red", 600, 20);

// 设置弧度路径的半径
const radius = 125;

// 设置弧度路径的坐标和大小
const arc = d3.arc()
    .innerRadius(radius)
    .outerRadius(radius);

// 数据数组，这里假设有三段弧度路径
const data = [
  { startAngle: 0 - (Math.PI / 6), endAngle: 2 * Math.PI / 3 - (Math.PI / 6) },
  { startAngle: 2 * Math.PI / 3 - (Math.PI / 6), endAngle: 4 * Math.PI / 3 - (Math.PI / 6) },
  { startAngle: 4 * Math.PI / 3 - (Math.PI / 6), endAngle: 6 * Math.PI / 3 - (Math.PI / 6) }
];

const arcs = svg.selectAll("g.arc")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(480,385)");

// 在弧度路径上添加弧
// arcs.append("path")
//     .attr("d", d => arc(d))
//     .attr("fill", "none")
//     .attr("stroke", "#333")
//     .attr("stroke-width", 2);
    
const label =['風險','成果','目標']

// 在弧度路径上添加文字
arcs.append("text")
    .attr("dy", ".35em")
    .attr("transform", function(d, i) {
        const pos = arc.centroid(d);
        // 計算弧線的中心角度
        const angle = (d.startAngle + d.endAngle) / 2;
        // 將文字向上移動一些，使其與弧線彎曲
        // const yOffset = Math.cos(angleInRadians);;
        // 將文字進行旋轉，使其與弧線一致
        return `translate(${pos[0]*1.1}, ${pos[1]*1.1}) rotate(${angle * (180 / Math.PI)})`;
    })
    .attr("text-anchor", "middle")
    .text(function(d, i) { return label[i]; }) // 使用 label 陣列來取得標籤文字
    .attr("fill", 'black')
    .style("font-size", "16px");
}
