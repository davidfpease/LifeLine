export const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


export const dataRow = d => {
  
  return {
    CountryName: d["Country Name"],
    1960: +d['1960'],
    1961: +d['1961'],
    1962: +d['1962'],
    1963: +d['1963'],
    1964: +d['1964'],
    1965: +d['1965'],
    1966: +d['1966'],
    1967: +d['1967'],
    1968: +d['1968'],
    1969: +d['1969'],
    1970: +d['1970'],
    1971: +d['1971'],
    1972: +d['1972'],
    1973: +d['1973'],
    1974: +d['1974'],
    1975: +d['1975'],
    1976: +d['1976'],
    1977: +d['1977'],
    1978: +d['1978'],
    1979: +d['1979'],
    1980: +d['1980'],
    1981: +d['1981'],
    1982: +d['1982'],
    1983: +d['1983'],
    1984: +d['1984'],
    1985: +d['1985'],
    1986: +d['1986'],
    1987: +d['1987'],
    1988: +d['1988'],
    1989: +d['1989'],
    1990: +d['1990'],
    1991: +d['1991'],
    1992: +d['1992'],
    1993: +d['1993'],
    1994: +d['1994'],
    1995: +d['1995'],
    1996: +d['1996'],
    1997: +d['1997'],
    1998: +d['1998'],
    1999: +d['1999'],
    2000: +d['2000'],
    2001: +d['2001'],
    2002: +d['2002'],
    2003: +d['2003'],
    2004: +d['2004'],
    2005: +d['2005'],
    2006: +d['2006'],
    2007: +d['2007'],
    2008: +d['2008'],
    2009: +d['2009'],
    2010: +d['2010'],
    2011: +d['2011'],
    2012: +d['2012'],
    2013: +d['2013'],
    2014: +d['2014'],
    2015: +d['2015'],
    2016: +d['2016'],
    2017: +d['2017'],
    2018: +d['2018'],
    2019: +d['2019'],
    2020: +d['2020'],
  }
};

export const calcDate = (id)=>{



  const birthYear = document.getElementById("year-display").innerHTML;
  const birthMonth = document.getElementById("month-display").innerHTML;
  const birthDay = document.getElementById("day-display").innerHTML;
  const bday = new Date(+birthYear, monthsArray.indexOf(birthMonth), +birthDay);
  const weekHover = document.getElementById("week-hover");

  let week = bday;
  week.setDate(bday.getDate() + id * 7);
  return week.toDateString();


  
}