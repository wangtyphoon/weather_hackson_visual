// const svg = d3.select('body')
//                 .append('svg')
//                 .attr('width',500)
//                 .attr('height',400);

// const height_male = svg.append("g")
//                         .attr('transform','translate(100,100)');

// height_male.append('line').attr('x1',0).attr('x2',173.5).style('stroke','black');
// height_male.append('circle').attr('cx',175).attr('cy',0).attr('r',3);
// height_male.append('text').attr('x',0).attr('y',20)
//                         .text("台灣男生平均身高173.5 cm");

// const height_female = svg.append("g")
//                         .attr('transform','translate(100,200)');

// height_female.append('line').attr('x1',0).attr('x2',173.5).style('stroke','black');
// height_female.append('circle').attr('cx',175).attr('cy',0).attr('r',3);
// height_female.append('text').attr('x',0).attr('y',20)
//                         .text("台灣女生平均身高161.5 cm");

const container = document.getElementById("chart-container");
container.style.backgroundImage = "url('https://t.pimg.jp/090/599/329/1/90599329.jpg')";
container.style.backgroundSize = "cover";
container.style.backgroundPosition = "center";