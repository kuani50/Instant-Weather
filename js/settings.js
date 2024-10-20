import { strToBool } from './utils.js';

// Puts the settings choice in the local storage
const latitudeAndLongitude = document.getElementById("latitudeAndLongitude");
const rain = document.getElementById("rain");
const windSpeed = document.getElementById("windSpeed");
const windDirection = document.getElementById("windDirection");

const sliderForNumberOfDay = document.getElementById("sliderNbDays");
const textNumberOfDay = document.getElementById("textNumberOfDays");

// Coordinates the buttons with the local storage
if(strToBool(localStorage.getItem("latitudeAndLongitude"))) latitudeAndLongitude.checked = true;
if(strToBool(localStorage.getItem("rain"))) rain.checked = true;
if(strToBool(localStorage.getItem("windSpeed"))) windSpeed.checked = true;
if(strToBool(localStorage.getItem("windDirection"))) windDirection.checked = true;

// Display slider label
function updateSliderLabel(){
    textNumberOfDay.innerText = `${sliderForNumberOfDay.value} jour${sliderForNumberOfDay.value>1 ? 's':''}`;
}

// Coordinates the slider with the local storage
if(localStorage.getItem("nbDays") != undefined){
    sliderForNumberOfDay.value = localStorage.getItem("nbDays");
    updateSliderLabel();
}

// Updates the local storage when the slider is moved
sliderForNumberOfDay.addEventListener('input', ()=>{
    localStorage.setItem("nbDays", sliderForNumberOfDay.value);
    updateSliderLabel();
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