import clock from "clock";
import document from "document";
import { preferences, units } from "user-settings";
import * as util from "../common/utils";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const day = document.getElementById("day");
const ddmmyyyy = document.getElementById("ddmmyyyy");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const ampm = document.getElementById("ampm");
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  
  //set the date
  ddmmyyyy.text = util.getDate(units.distance, today);  
  
  //lets set the day
  day.text = util.getDay(today);
  
  //lets set the time
  let hrs = today.getHours();
  let ap = " a";
  if (preferences.clockDisplay === "12h") {
    // 12h format
    ap = (hrs < 12) ? "a" : "p";
    hrs = (hrs % 12 || 12);
  } else {
    ap = "";
    // 24h format
    hrs = util.zeroPad(hrs);
  }
  let mins = util.zeroPad(today.getMinutes());
  hours.text = `${hrs}`;
  minutes.text = `${mins}`;
  ampm.text = `${ap}`;
}

/* HEART RATE */
const hr = document.getElementById("hr");
hr.text='--';
if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
      hr.text = `${hrm.heartRate} bpm`;
  });
  display.addEventListener("change", () => {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
}

/* BATTERY */
import { battery } from "power";
const bat = document.getElementById("battery");
battery.addEventListener("change", () => {
  bat.text='';
  for(var i=0; i<Math.floor(battery.chargeLevel/10); i++){
    bat.text += '|';
  }  
});

/* ACTIVITY */
import { today } from "user-activity";
const steps = document.getElementById("steps");
const floors = document.getElementById("floors");
const calories = document.getElementById("calories");
const distance = document.getElementById("distance");
const activeMins = document.getElementById("activeMins");
if(appbit.permissions.granted("access_activity")) {
  steps.text=`${today.adjusted.steps} steps`;
  if (today.local.elevationGain !== undefined) {
   floors.text=`${today.adjusted.elevationGain} floor(s)`;
  }
  if (today.local.calories !== undefined) {
    calories.text=`${today.adjusted.calories} kCal`;
  }
  if(today.local.activeMinutes !== undefined) {
    activeMins.text=`${today.adjusted.activeMinutes}m active`;
  }
  if(today.local.distance != undefined) {
    //distance in kms
    distance.text = util.getDistance(units.distance, today.local.distance);
  }
}

