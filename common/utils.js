// Add zero in front of numbers < 10
export function zeroPad(i) {
  return ("0" + i).slice(-2);
}

export function getDate(format, today) {
  if(format === "us") {
      return `${today.getMonth()+1}/${today.getDate()}`;
  } 
  return `${today.getDate()}/${today.getMonth()+1}`;
}

export function getDistance(unit, distance) {
  let dist = Math.floor(distance)/1000
  console.log(unit);  
  if(unit === "us") {
    dist = Math.floor(dist * 0.62137);
    return `${dist} mi`
  } 
  return `${dist} km`
}

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export function getDay(today) {
  return days[today.getDay()];
}