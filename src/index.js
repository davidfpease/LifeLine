import "./styles/index.scss";


d3.select("body").append("div").attr("id", "year-slider");
d3.select("body").append("div").attr("id", "gender-option");
d3.select("body").append("div").attr("id", "country-option");

drawGraph();

function drawGraph(){
  const height = 1000;
  const width = 500;

  const currentYear = new Date().getFullYear();
  const years = d3.range(0, currentYear-1900+1).map(d=> new Date(1900+d,0,1));
  const scale = d3.scaleTime().domain([new Date(1900), new Date(currentYear)])
                .range([0,300]);
  //year slider
  const yearSlider = d3.sliderLeft(scale)
                      .min(d3.min(years))
                      .max(d3.max(years))
                      .step(1000*60*24*365)
                      .width(300)
                      .height(300)
                      .tickFormat(d3.timeFormat('%Y'))
                      //.tickValues(years)
                      .default(new Date(1980, 0,1))
                      .on('onchange', val => {
                        d3.select('#year-display').text(d3.timeFormat('%Y')(val))   
                      });
  
  const gTime = d3.select('#year-slider')
                  .append('svg')
                  .attr('width', 100)
                  .attr('height', 400)
                  .append('g')
                  .attr('transform', 'translate(60,30)');
  
  gTime.call(yearSlider);
  d3.select('#year-display').text(d3.timeFormat('%Y')(yearSlider.value()));

  const lifeExpectancy = 3000;  //this will be a calculated value
  const past = "#5ac18e";

  const svg = d3.select("#life-chart").append("svg")//.attr("viewBox", `0, 0, ${width/2}, ${height/2}`);
                .attr("width", width)
                .attr("height", height);

  const container = svg.append("g")
                    .attr("transform", "translate(2,2)");

  const numRows = 100;
  const numCols = 56;

  const data = d3.range(numCols*numRows);

  const y = d3.scaleBand()
            .range([0,height])
            .domain(d3.range(numRows));

  const x = d3.scaleBand()
            .range([0,width])
            .domain(d3.range(numCols));
            debugger;

  container.selectAll("square")
      .data(data)
      .enter().append("rect")
      .attr("id", function(d){return d})
      .attr("rx", 1)
      .attr("ry", 1)
      .attr("x", function(d){return x(d%numCols);})
      .attr("y", function(d){return y(Math.floor(d/numCols));})
      .attr("width",6)
      .attr("height", 6)
      .style("stroke-width", .5)
      .style("fill", function(d){return d <= lifeExpectancy ? past : "none"})
      .style("stroke", "black");
}