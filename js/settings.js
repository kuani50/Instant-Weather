import { strToBool } from './utils.js';

// manages the closing button


// puts the settings choice in the local storage
let latitudeAndLongitude = document.getElementById("latitudeAndLongitude");
let rain = document.getElementById("rain");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");


if(strToBool(localStorage.getItem("latitudeAndLongitude"))) latitudeAndLongitude.checked = true;
if(strToBool(localStorage.getItem("rain"))) rain.checked = true;
if(strToBool(localStorage.getItem("windSpeed"))) windSpeed.checked = true;
if(strToBool(localStorage.getItem("windDirection"))) windDirection.checked = true;

latitudeAndLongitude.addEventListener('change', () => {
    localStorage.setItem("latitudeAndLongitude", latitudeAndLongitude.checked);
});

rain.addEventListener('change', () => {
    localStorage.setItem("rain", rain.checked);
});

windSpeed.addEventListener('change', () => {
    localStorage.setItem("windSpeed", windSpeed.checked);
});

windDirection.addEventListener('change', () => {
    localStorage.setItem("windDirection", windDirection.checked);
});