import {weather} from './api_weather.js';

// An array that contains the name of the months in French to associate them with the month numbe
const monthLabel = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" ];

const coord = document.getElementById("coord");
const emoji = document.getElementById("emoji");
const card = document.getElementById("card");
const back = document.getElementById("back_icon");
const cityTitle = document.getElementById("city");

// Redirects to the main page when the back button is clicked
back.addEventListener("click",backToMainPage);

// Redirects to the main page
function backToMainPage(){
    const url = new URL(window.location.href);
    url.pathname="/pages/main_page.html";
    document.location.href=url;
}

// Returns true if the string is equal to "true" and false otherwise
function strToBool(str){
    return str === 'true';
}

// Displays the latitude and longitude if the user has chosen to display them
function loadSettings(){
    if(strToBool(localStorage.getItem("latitudeAndLongitude"))) coord.classList.remove("hidden");
}
loadSettings();

// Returns the emoji associated with the weather code
async function getWeatherEmoji(code){
    const result = await (await fetch('/assets/code_emoji.json')).json();
    return `/assets/weather/weather_emoji/${result[code]}`;
}

// Returns the date in French
function getFrenchDate(date){
    
    const year = date.getFullYear();
    const dayNumber = date.getDate();
    const month = monthLabel[date.getMonth()];
    let weekday = date.toLocaleDateString("fr-FR", { weekday: "long" });
    weekday = weekday.split('');
    weekday[0] = weekday[0].toUpperCase();
    weekday = weekday.join('');

    return `${weekday} ${dayNumber} ${month} ${year}`;
    
}

// Displays the rain animation if the weather is rainy
function displayRainBackground(emoji){
    if(emoji.src.includes("Rain")){
        const animation = document.getElementById("animation-rain");
        animation.classList.add("rain");
    } 
}

// Displays the snow animation if the weather is snowy
function displaySnowBackground(emoji){
    if(emoji.src.includes("Snow")){
        const animation = document.getElementById("animation-snow");
        animation.classList.add("snow");
    } 
}

// Displays the weather of the city following the settings chosen by the user
async function displayWeather(){
    const url = new URLSearchParams(window.location.search);
    const insee = url.get("insee");
    const city = url.get("city");

    let result;
    try{
        result = await weather(insee);
    }catch{
        backToMainPage();
    }

    cityTitle.innerText=city;
    coord.innerText=`latitude: ${result[0].latitude}, longitude: ${result[0].longitude}`;
    emoji.src=await getWeatherEmoji(result[0].weatherCode);

    displayRainBackground(emoji);
    displaySnowBackground(emoji);

    const date = new Date();

    let limit = localStorage.getItem("nbDays");

    // Creates a card for each day of the weather forecast
    for(const element of result){
        // Checks whether enough days have been displayed according to the choice of the user
        if(limit <= 0) break;
        limit--;
        const oneCard = card.content.cloneNode(true);
        oneCard.querySelectorAll('h1')[0].innerText=getFrenchDate(date);
        date.setDate(date.getDate()+1);

        let full_info = false;
        let classList;
        if(strToBool(localStorage.getItem("windSpeed"))){
            full_info=true;
            classList = oneCard.querySelectorAll('.weather_wind')[0].parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
        }
        if(strToBool(localStorage.getItem("windDirection"))){
            full_info=true;
            classList = oneCard.querySelectorAll('.weather_wind_dir')[0].parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
        }
        if(strToBool(localStorage.getItem("rain"))){
            full_info=true;
            classList = oneCard.querySelectorAll('.weather_cumul_rain')[0].parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
        }
        if(full_info){
            classList = oneCard.querySelectorAll('.weather_cumul_rain')[0].parentNode.parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
            
            oneCard.querySelectorAll('.weather_emoji')[0].parentNode.classList.add("flex-col");
            oneCard.querySelectorAll('.weather_emoji')[0].style.width="13vw";
            for(const e of oneCard.querySelectorAll('.weather-split-bar'))
                e.classList.remove("hidden");

        }

        // Adds all of the information to the card
        oneCard.querySelectorAll('.weather_max_temp')[0].innerText=`${element.tMax}°C`;
        oneCard.querySelectorAll('.weather_min_temp')[0].innerText=`${element.tMin}°C`;
        oneCard.querySelectorAll('.weather_rain_proba')[0].innerText=`${element.probaRain}%`;
        oneCard.querySelectorAll('.weather_sun_hours')[0].innerText=`${element.sunHours}h`;
        oneCard.querySelectorAll('.weather_cumul_rain')[0].innerText=`${element.cumulRain} mm`;
        oneCard.querySelectorAll('.weather_wind')[0].innerText=`${element.avgWind} km/h`;
        oneCard.querySelectorAll('.weather_wind_dir')[0].innerText=`${element.avgWind}°`;
        oneCard.querySelectorAll('.weather_label')[0].innerText=element.weather;
        const img = oneCard.querySelectorAll('.weather_emoji')[0];
        getWeatherEmoji(element.weatherCode).then(emoji => {
            img.src=emoji;
        });
        
        card.parentNode.appendChild(oneCard);
        
    }

}
displayWeather();
