import { strToBool } from './utils.js';

// Puts the settings choice in the local storage
let latitudeAndLongitude = document.getElementById("latitudeAndLongitude");
let rain = document.getElementById("rain");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");

let sliderForNumberOfDay = document.getElementById("sliderNbDays");
let textNumberOfDay = document.getElementById("textNumberOfDays");

// Coordinates the buttons with the local storage
if(strToBool(localStorage.getItem("latitudeAndLongitude"))) latitudeAndLongitude.checked = true;
if(strToBool(localStorage.getItem("rain"))) rain.checked = true;
if(strToBool(localStorage.getItem("windSpeed"))) windSpeed.checked = true;
if(strToBool(localStorage.getItem("windDirection"))) windDirection.checked = true;

// Coordinates the slider with the local storage
if(localStorage.getItem("nbDays") != undefined){
    sliderForNumberOfDay.value = localStorage.getItem("nbDays");
    textNumberOfDay.innerText = localStorage.getItem("nbDays") + " jours";
}

// Updates the local storage when the slider is moved
sliderForNumberOfDay.addEventListener('input', ()=>{
    localStorage.setItem("nbDays", sliderForNumberOfDay.value);
    textNumberOfDay.innerText = sliderForNumberOfDay.value + " jours";
});

// Updates the local storage when the latitude and longitude button is clicked
latitudeAndLongitude.addEventListener('change', () => {
    localStorage.setItem("latitudeAndLongitude", latitudeAndLongitude.checked);
});

// Updates the local storage when the rain button is clicked
rain.addEventListener('change', () => {
    localStorage.setItem("rain", rain.checked);
});

// Updates the local storage when the wind speed button is clicked
windSpeed.addEventListener('change', () => {
    localStorage.setItem("windSpeed", windSpeed.checked);
});

// Updates the local storage when the wind direction button is clicked
windDirection.addEventListener('change', () => {
    localStorage.setItem("windDirection", windDirection.checked);
});