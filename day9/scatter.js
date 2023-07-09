export default function drawscatter(){
    // 创建单选按钮容器
    let bottomContainer = d3.select('.bottom-container')
    let radioContainerX = bottomContainer.append("div")
    .style('position', 'fixed')
    .style('top', '2%')
    .style('left', '60%');

    let xkey = '營收';//x軸關鍵字
    let ykey = '碳排';//y軸關鍵字

    bottomContainer.append("div")
    .text("橫軸")
    .style('position', 'fixed')
    .style('font-size', "16px")
    .style('top', '2%')
    .style('left', "58%")
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
    .style('left', "58%")
    .style('font-family', 'Arial'); // 设置字体样式，例如 Arial

    let radioContainerY = bottomContainer.append("div")
    .style('position', 'fixed')
    .style('top', '5%')
    .style('left', '60%');
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

    d3.selectAll("input[type='radio']")
  .on("change", function() {
    // 获取关联标签的文本内容
    let labelText = d3.select("label[for='" + this.id + "']").text();
    // 更改橫軸或縱軸的關鍵字
    if (this.name ==  "myRadioButtonsX"){  //橫軸
        xkey= labelText
    }
    else if (this.name ==  "myRadioButtonsY"){ //縱軸
        ykey= labelText
    }
  });
}