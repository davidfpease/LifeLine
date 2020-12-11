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

const weekHover = document.getElementById("week-hover");

document.getElementById("country-list").addEventListener('change', ()=>calculateExpectancy());
document.querySelectorAll('rect').forEach(r => {
  r.addEventListener('mouseover', (e)=>{
    //console.log(e.currentTarget.id);
    weekHover.innerHTML = `Week #: ${e.currentTarget.id}`;
    
  });
})

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
      .attr("selected", d => {
        if (d === "United States"){
          return "selected";
        };
      })
      .text(d => d);

      
  countryList.select(d=>{
  });  
});



function drawGraph(){
  const height = 1000;
  const width = 500;

  const svg = d3.select("#life-chart").append("svg")//.attr("viewBox", `0, 0, ${width/2}, ${height/2}`);
                .attr("width", width)
                .attr("height", height);

  const container = svg.append("g")
                    .attr("transform", "translate(2,2)");

  const numRows = 100;
  const numCols = 52;

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
  const birthDay = document.getElementById("day-display").innerHTML;
  const weeksLived = document.getElementById("weeks-lived");
  const weeksRemaining = document.getElementById("weeks-remaining");

  const country = document.getElementById("country-list").value;
  const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  //get data from csv
  const lifeData = dataObj[country][birthYear];
   

  lifeExpectancy = Math.floor(lifeData*52.14); //weeks per year
  //calculate current week
  const today = new Date();
  const bday = new Date(+birthYear, monthsArray.indexOf(birthMonth),+birthDay);
    
  const currentWeek = Math.floor(((today-bday)/(1000*60*60*24*365))*52.14);
  let lived = (currentWeek - 1).toLocaleString('en', { useGrouping: true });
  let remaining = (lifeExpectancy - currentWeek).toLocaleString('en', { useGrouping: true })
  weeksLived.innerHTML = `Weeks Lived: ${lived}`;
  weeksRemaining.innerHTML = `Weeks Remaining: ${remaining}`;


  d3.selectAll('rect')
    .attr('class', (d,i)=>{
      // debugger;
      let className = [];
      if (d === currentWeek){
        className.push('current-week'); 
      };
      if (d<currentWeek) {
        className.push("lived");
      };
      if (d< lifeExpectancy){
        className.push("pre");
      };
      if (d > lifeExpectancy){
        className.push("post");
      };
      if (d === lifeExpectancy){
        className.push("yahtzee");
      };
      return className.join(' ');

    })
}



//event listeners for sliders
const config = { attributes: true,
                childList: true,
                characterData: true,
                subtree: true, };
const observer = new MutationObserver(()=>calculateExpectancy());
observer.observe(document.getElementById("year-display"), config);
observer.observe(document.getElementById("month-display"), config);
observer.observe(document.getElementById("day-display"), config);
