import "./styles/index.scss";
import { dataRow } from './assets/dataHelper.js';
import { addSliders } from './assets/addSliders.js';
//import { calculateExpectancy } from './scripts/calculateExpectancy.js';


d3.select("body").append("div").attr("id", "year-slider");
d3.select("body").append("div").attr("id", "month-slider");
d3.select("body").append("div").attr("id", "day-slider");
d3.select("body").append("div").attr("id", "gender-option");
d3.select("body").append("div").attr("id", "country-option");

let selectedCountry;
let lifeExpectancy = 2743;  //this will be a calculated value

drawGraph();
addSliders();

document.getElementById("country-list").addEventListener('change', ()=>calculateExpectancy());
document.getElementById("country-list").addEventListener('change', ()=>calculateExpectancy());


//source https://data.worldbank.org/indicator/SP.DYN.LE00.IN
//life expectancy at birth, by country
let dataObj = {};
d3.csv("./src/assets/API_SP.DYN.LE00.IN_DS2_en_csv_v2_1740384.csv").then(data => {
  data.map(d=>{
      dataObj[d['Country Name']] = dataRow(d);
  });
  
  const countryList = d3.select("#country-list");

  countryList.selectAll('option')
    .data(['None'].concat(Object.keys(dataObj)))
    .enter()
      .append("option")
      .attr("value", d => d)
      .text(d => d);
});


function drawGraph(){
  const height = 1000;
  const width = 500;



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
      //.style("fill", "none")
      .attr("class", function(d){return d <= lifeExpectancy ? "pre" : "post"})
      //.style("stroke", "black");
}




const calculateExpectancy = () => {
  const birthYear = document.getElementById("year-display").innerHTML;
  const birthMonth = document.getElementById("month-display").innerHTML;
  const country = document.getElementById("country-list").value;
  const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  //get data from csv
  const lifeData = dataObj[country][birthYear];
  const currentWeek = 

  lifeExpectancy = Math.floor(lifeData*52.14); //weeks per year
  //drawGraph();
//  debugger;
  d3.selectAll('rect')
    .attr('class', (d,i)=>{
      debugger;
      if (d< lifeExpectancy){
        return "pre";
      } else if (d > lifeExpectancy){
        return "post";
      } else if (d === lifeExpectancy){
        return "yahtzee";
      }
    })



}