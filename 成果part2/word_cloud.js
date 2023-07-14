export default function word_cloud(xPos,yPos,company){
    // 指定新視窗的尺寸和位置
    const windowWidth = 1080;
    const windowHeight = 1080;
    const windowLeft = window.screenX + xPos;
    const windowTop = window.screenY + yPos;
    // 在指定尺寸和位置創建新視窗
    const newWindow = window.open("", "_blank", `width=${windowWidth}, height=${windowHeight}, left=${windowLeft}, top=${windowTop}`);
    
    // 在新視窗內創建一個 SVG 元素
    const svg = d3.select(newWindow.document.body)
      .append("svg")
      .attr("width", windowWidth)
      .attr("height", windowHeight);
    
    // 在 SVG 內創建一個圓形元素
    svg.append("circle")
      .attr("cx", windowWidth / 2)
      .attr("cy", windowHeight / 2)
      .attr("r", 50)
      .style("fill", "yellow");
}