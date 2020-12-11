import { calculateExpectancy } from '../scripts/calculateExpectancy.js';


export const addSliders = ()=>{
  const currentYear = new Date().getFullYear();
  const years = d3.range(0, currentYear - 1960 + 1).map(d => new Date(1960 + d, 0, 1));
  
  //year slider
  const yearSlider = d3.sliderLeft()
    .min(d3.min(years))
    .max(d3.max(years))
    .step(1000 * 60 * 24 * 365)
    .width(300)
    .height(300)
    .tickFormat(d3.timeFormat('%Y'))
    //.tickValues(years)
    .default(new Date(1980, 0, 1))
    .on('onchange', val => {
      d3.select('#year-display').text(d3.timeFormat('%Y')(val));
      //calculateExpectancy();
    });

  const gTime = d3.select('#year-slider')
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  gTime.call(yearSlider);
  d3.select('#year-display').text(d3.timeFormat('%Y')(yearSlider.value()));

  //months slider
  const months = d3.range(1, 13).map(d => new Date(1900, d, 1));
  const monthSlider = d3.sliderLeft()
    .min(d3.min(months))
    .max(d3.max(months))
    .step(1)
    .width(300)
    .height(300)
    .tickFormat(d3.timeFormat('%b'))
    .default(new Date(1900,5))
    .on('onchange', val => {
      d3.select('#month-display').text(d3.timeFormat('%b')(val));
      //calculateExpectancy();
    });

  const gTimeMonth = d3.select('#month-slider')
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  gTimeMonth.call(monthSlider);
  d3.select('#month-display').text(d3.timeFormat('%b')(monthSlider.value()));


  //Day Slider
  //months slider
  const days = d3.range(1, 32);
  const daySlider = d3.sliderLeft()
    .min(d3.min(days))
    .max(d3.max(days))
    .step(1)
    .width(300)
    .height(300)
    .ticks(31)
    .default(15)
    .on('onchange', val => {
      d3.select('#day-display').text((val));
      //calculateExpectancy();
    });

  const gTimeDay = d3.select('#day-slider')
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  gTimeDay.call(daySlider);
  d3.select('#day-display').text((daySlider.value()));
}