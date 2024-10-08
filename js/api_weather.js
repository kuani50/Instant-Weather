async function weather(cityCode){

    let reponse = await fetch("https://api.meteo-concept.com/api/forecast/daily?token=6de9e5283b4e827ab2a94e0b552c8c74a8a243d900f00ccfaa329f63ec8fa42a&insee=" + cityCode);
    let tab = await reponse.json();

    console.log(tab);
    console.log("weather : " + tab[0])

}

async function weather2(){

    let reponse = await fetch("../tempores.json");
    let tab = await reponse.json();
    let weatherTab = []; 
    
    console.log(tab);


    tab.forecast.forEach(element =>{
        console.log(element["weather"]);
        weatherTab.push({
            "latitude" : element["latitude"], "longitude" : element["longitude"],
            "tMax" : element["tmax"], "tMin" : element["tmin"], "probaRain" : element["probarain"],
            "sunHours" : element["sun_hours"], "cumulRain" : element["rr10"], "avgWind" : element["wind10m"],
            "windDir" : element["dirwind10m"]
        });
    });

    console.table(weatherTab);
    return weatherTab;

}

async function loadCodeWeather(){
    return await (await fetch("../assets/code_weather.json")).json();
}

async function getCodeWeather(code){
    return (await loadCodeWeather())[code];
}