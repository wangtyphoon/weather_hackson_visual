// 匯出預設的函式
export default function  click() {
    var selectedOptvalue = this.value;
    var selectedOptgroup = d3.select('#dropdown option:checked').node().parentNode.label;
    var category = selectedOptgroup +'_'+ selectedOptvalue;
    console.log(category);
};