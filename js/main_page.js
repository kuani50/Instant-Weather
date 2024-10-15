import { search } from "./api_postal_code.js";

let settings_button = document.getElementById('settings_button');
let settings_page = document.getElementById('settings_page');

let settings_object = document.getElementById('settings_object');

let search_bar = document.getElementById('search_bar');
let city_choice = document.getElementById('city_choice');
const row_template = document.getElementById('row_template');

setupLocalStorage();

// will manage everything related to the settings only when the settings page is open
settings_object.addEventListener('load', () => {

    // manages the closing button
    let close = settings_object.contentDocument.getElementById('close');
    
    close.addEventListener('click', () => {
        settings_page.classList.toggle('hidden');
    });

    // puts the settings choice in the local storage
    let latitudeAndLongitude = settings_object.contentDocument.getElementById("latitudeAndLongitude");
    let rain = settings_object.contentDocument.getElementById("rain");
    let windSpeed = settings_object.contentDocument.getElementById("windSpeed");
    let windDirection = settings_object.contentDocument.getElementById("windDirection");

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
});

// manages the button to open the settings
settings_button.addEventListener('click', () => {
    settings_page.classList.toggle('hidden');
});

// setups the local storage even when no settings have been chosen
function setupLocalStorage(){
    if(localStorage.getItem("latitudeAndLongitude") == null){
        localStorage.setItem("latitudeAndLongitude", false);
        localStorage.setItem("rain", false);
        localStorage.setItem("windSpeed", false);
        localStorage.setItem("windDirection", false);
    }
}

// displays the available search results
search_bar.addEventListener('input', async () => {
    let resultats = await search(search_bar.value);
    if(resultats == null) {
        city_choice.innerHTML = '';
        return;
    }

    city_choice.setAttribute("size", resultats.length);
    Array.from(resultats).forEach(element => {
        let row = row_template.content.cloneNode(true);
        let row_content = row.querySelectorAll("*");
        row_content[0].innerHTML = element['nom'];
        city_choice.appendChild(row);
    });

    // adds border radius to the last element of the list
    let last = Array.from(city_choice.children).pop();
    last.classList.add("rounded-br-lg");
    last.classList.add("rounded-bl-lg");
    city_choice.appendChild(last);
});
