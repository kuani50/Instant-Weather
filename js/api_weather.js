// Fetches the weather data from the API with the city code chosen by the user
export async function weather(cityCode){

    let reply = await fetch("https://api.meteo-concept.com/api/forecast/daily?token=6de9e5283b4e827ab2a94e0b552c8c74a8a243d900f00ccfaa329f63ec8fa42a&insee=" + cityCode);
    let tab = await reply.json();
    
    let weatherTab = []; 

    for(const element of tab.forecast){
        weatherTab.push({
            "latitude" : element["latitude"], "longitude" : element["longitude"],
            "tMax" : element["tmax"], "tMin" : element["tmin"], "probaRain" : element["probarain"],
            "sunHours" : element["sun_hours"], "cumulRain" : element["rr10"], "avgWind" : element["wind10m"],
            "windDir" : element["dirwind10m"], "weather" : (await getCodeWeather(element["weather"])),
            "weatherCode" : element["weather"]
        })
    }
    
    return weatherTab;
}

// Loads the json file containing the weather codes
async function loadCodeWeather(){
    return await (await fetch("../assets/code_weather.json")).json();
}

// Returns the weather associated with the code
async function getCodeWeather(code){
    return (await loadCodeWeather())[code];
}

// Loads the file containing a result of the API
// Used for tests 
export async function weather2(cityCode){

    let reponse = await fetch("/tempores.json");
    let tab = await reponse.json();
    
    let weatherTab = []; 

    for(const element of tab.forecast){
        weatherTab.push({
            "latitude" : element["latitude"], "longitude" : element["longitude"],
            "tMax" : element["tmax"], "tMin" : element["tmin"], "probaRain" : element["probarain"],
            "sunHours" : element["sun_hours"], "cumulRain" : element["rr10"], "avgWind" : element["wind10m"],
            "windDir" : element["dirwind10m"], "weather" : (await getCodeWeather(element["weather"])),
            "weatherCode" : element["weather"]
        })
    }

    return weatherTab;
}