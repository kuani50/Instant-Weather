import {weather} from './api_weather.js';

const monthLabel = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" ]

const coord = document.getElementById("coord");
const emoji = document.getElementById("emoji");
const card = document.getElementById("card");
const back = document.getElementById("back_icon");
const cityTitle = document.getElementById("city");

back.addEventListener("click",() => {
    const url = new URL(window.location.href);
    url.pathname="/pages/main_page.html";
    document.location.href=url;
})

function strToBool(str){
    return str === 'true';
}

function loadSettings(){
    if(strToBool(localStorage.getItem("latitudeAndLongitude"))) coord.classList.remove("hidden");
}
loadSettings();


async function getMeteoEmoji(code){
    let result = await (await fetch('/assets/code_emoji.json')).json();
    return `/assets/meteo/meteo_emoji/${result[code]}`;
}


function getFrenchDate(date){
    
    let year = date.getFullYear()
    let dayNumber = date.getDate()
    let month = monthLabel[date.getMonth()]
    let weekday = date.toLocaleDateString("fr-FR", { weekday: "long" });
    weekday = weekday.split('');
    weekday[0] = weekday[0].toUpperCase();
    weekday = weekday.join('');

    return `${weekday} ${dayNumber} ${month} ${year}`;
    
}

async function displayMeteo(){
    const url = new URLSearchParams(window.location.search);
    const insee = url.get("insee");
    const city = url.get("city");


    const result = await weather(insee);

    console.log(result);

    cityTitle.innerText=city;
    coord.innerText=`latitude: ${result[0].latitude}, longitude: ${result[0].longitude}`;
    emoji.src=await getMeteoEmoji(result[0].weatherCode);

    const date = new Date();

    result.forEach(async (element) => {
        const oneCard = card.content.cloneNode(true);
        oneCard.querySelectorAll('h1')[0].innerText=getFrenchDate(date);
        date.setDate(date.getDate()+1);

        let full_info = false;
        let classList;
        if(strToBool(localStorage.getItem("windSpeed"))){
            full_info=true;
            classList = oneCard.querySelectorAll('.meteo_wind')[0].parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
        };
        if(strToBool(localStorage.getItem("windDirection"))){
            full_info=true;
            classList = oneCard.querySelectorAll('.meteo_wind_dir')[0].parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
        };
        if(strToBool(localStorage.getItem("rain"))){
            full_info=true;
            classList = oneCard.querySelectorAll('.meteo_cumul_rain')[0].parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
        };
        if(full_info){
            classList = oneCard.querySelectorAll('.meteo_cumul_rain')[0].parentNode.parentNode.classList;
            classList.remove("hidden");
            classList.add("flex");
            
            oneCard.querySelectorAll('.meteo_emoji')[0].parentNode.classList.add("flex-col");
            oneCard.querySelectorAll('.meteo_emoji')[0].style.width="13vw";

        }

        oneCard.querySelectorAll('.meteo_max_temp')[0].innerText=`${element.tMax}°C`;
        oneCard.querySelectorAll('.meteo_min_temp')[0].innerText=`${element.tMin}°C`;
        oneCard.querySelectorAll('.meteo_rain_proba')[0].innerText=`${element.probaRain}%`;
        oneCard.querySelectorAll('.meteo_sun_hours')[0].innerText=`${element.sunHours}h`;
        oneCard.querySelectorAll('.meteo_cumul_rain')[0].innerText=`${element.cumulRain} mm`;
        oneCard.querySelectorAll('.meteo_wind')[0].innerText=`${element.avgWind} km/h`;
        oneCard.querySelectorAll('.meteo_wind_dir')[0].innerText=`${element.avgWind}°`;
        oneCard.querySelectorAll('.meteo_label')[0].innerText=element.weather;
        oneCard.querySelectorAll('.meteo_emoji')[0].src=await getMeteoEmoji(element.weatherCode);
        
        card.parentNode.appendChild(oneCard);
        
    });

}
displayMeteo();
