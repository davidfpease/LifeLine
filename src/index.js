import "./styles/index.scss";
import { dataRow, calcDate, monthsArray } from './assets/dataHelper.js';
import { addSliders } from './assets/addSliders.js';

let selectedCountry;
let lifeExpectancy = 2743;  

drawGraph();
addSliders();



const weekHover = document.getElementById("week-hover");


document.getElementById("country-list").addEventListener('change', ()=>calculateExpectancy());
document.getElementById("wait-but-why").addEventListener('click', () => newTab("https://waitbutwhy.com/2014/05/life-weeks.html"));
document.getElementById("world-bank").addEventListener('click', () => newTab("https://data.worldbank.org/indicator/SP.DYN.LE00.IN"));
document.getElementById("david-pease").addEventListener('click', () => newTab("http://davidpease.me"));


//source https://data.worldbank.org/indicator/SP.DYN.LE00.IN
//life expectancy at birth, by country
let dataObj = {};
d3.csv("./dist/API_SP.DYN.LE00.IN_DS2_en_csv_v2_1740384.csv").then(data => {
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
}).then(()=>calculateExpectancy());

function newTab(tab){
  window.open(tab, "_blank")
}



function drawGraph(){
  const height = 500;
  const width = 1000;

  const svg = d3.select("#life-chart").append("svg")
                .attr("width", width)
                .attr("height", height);

  const container = svg.append("g")
                    .attr("transform", "translate(2,2)");

  const numRows = 52;
  const numCols = 100;

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
      .attr("x", function (d) { return x(Math.floor(d / numRows));})
      .attr("y", function(d){return y(d%numRows);})
      .attr("width",6)
      .attr("height", 6)
      .style("stroke-width", .5)
      .attr("class", function(d){return d <= lifeExpectancy ? "pre" : "post"});

  let eNums = [];
  for (let i = 2; i <=100; i++){
    i % 2 === 0 ? eNums.push(i) : null;
  }

  const yearsScale = d3.scaleLinear().domain([0,50]).range([0,500]);
  const yearsAxis = d3.axisBottom(yearsScale).ticks(50)
        .tickFormat(d=> d === 0 ? "": d)
        .tickValues(eNums);

    d3.select("#year-ticks").append("svg")
      .attr("width", 1010)
      .attr("height", 25)
      .attr("class", "year-ticks")
      .append("g")
      .attr("class", "year-scale")
      .call(yearsAxis).call(g => {
        g.select(".domain")
        .remove();
        g.selectAll('line').attr("transform", "translate(0, 18)")
        .attr("class", "year-scale-line")
        ;}
      );

  let eNums2 = [];
  for (let i = 2; i <= 52; i++) {
    i % 2 === 0 ? eNums2.push(i) : null;
  }
  const weeksTicks = d3.select("#week-ticks")
    .append("svg")
    .attr("height", 500)
    .attr("width", 30);

  const weekScale = d3.scaleLinear()
    .domain([0, 52])
    .range([0, 500]);

  const weeksAxis = d3.axisLeft()
    .scale(weekScale);

  weeksTicks.append("g")
    .attr("transform", "translate(25, 10)")
    .call(weeksAxis)
    .call(g=>{
      g.select(".domain").remove();
      g.select('.tick').select('text').html() === "0" ? g.select('.tick').remove(): null ;
    });

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
  weeksLived.innerHTML = lived;
  weeksRemaining.innerHTML = remaining;


  d3.selectAll('g rect')
    .attr('class', (d,i)=>{
      
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

document.querySelectorAll('rect').forEach(r => {
  r.addEventListener('mouseover', (e) => {
    weekHover.innerHTML = calcDate(e.currentTarget.id);
    
  });
})