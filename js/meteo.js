import {weather2} from './api_weather.js';

const monthLabel = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" ]

const coord = document.getElementById("coord");
const emoji = document.getElementById("emoji");
const card = document.getElementById("card");

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
    const insee = new URLSearchParams(window.location.search).get("insee");

    const result = await weather2(insee);

    console.log(result);

    coord.innerText=`latitude: ${result[0].latitude}, longitude: ${result[0].longitude}`;
    emoji.src=await getMeteoEmoji(result[0].weatherCode);

    if(emoji.src.includes("Rain")){
        let animation = document.getElementById("animation-rain");
        animation.classList.add("rain");
    } 

    if(emoji.src.includes("Snow")){
        let animation = document.getElementById("animation-snow");
        animation.classList.add("rain");
    } 

    const date = new Date();

    result.forEach(async (element) => {
        const oneCard = card.content.cloneNode(true);
        oneCard.querySelectorAll('h1')[0].innerText=getFrenchDate(date);
        date.setDate(date.getDate()+1);
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
