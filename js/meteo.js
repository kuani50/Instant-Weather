import {weather2} from './api_weather.js';

const monthLabel = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" ]

const coord = document.getElementById("coord");

const card = document.getElementById("card");


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

    const date = new Date();

    result.forEach(element => {
        const oneCard = card.content.cloneNode(true);
        oneCard.querySelectorAll('h1')[0].innerText=getFrenchDate(date);
        oneCard.querySelectorAll('.meteo_max_temp')[0].innerText=`${element.tMax}°C`;
        oneCard.querySelectorAll('.meteo_min_temp')[0].innerText=`${element.tMin}°C`;
        oneCard.querySelectorAll('.meteo_rain_proba')[0].innerText=`${element.probaRain}%`;
        oneCard.querySelectorAll('.meteo_sun_hours')[0].innerText=`${element.sunHours}h`;
        oneCard.querySelectorAll('.meteo_cumul_rain')[0].innerText=`${element.cumulRain} mm`;
        oneCard.querySelectorAll('.meteo_wind')[0].innerText=`${element.avgWind} km/h`;
        oneCard.querySelectorAll('.meteo_wind_dir')[0].innerText=`${element.avgWind}°`;
        card.parentNode.appendChild(oneCard);
        date.setDate(date.getDate()+1);
    });

}
displayMeteo();
