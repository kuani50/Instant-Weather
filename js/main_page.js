import { search } from "./api_postal_code.js";

const settings_button = document.getElementById('settings_button');
const settings_page = document.getElementById('settings_page');

const settings_object = document.getElementById('settings_object');

const search_bar = document.getElementById('search_bar');
const city_choice = document.getElementById('city_choice');
const row_template = document.getElementById('row_template');

setupLocalStorage();


settings_object.addEventListener('load', () => {
    const close = settings_object.contentDocument.getElementById('close');
    close.addEventListener('click', () => {
        settings_page.classList.toggle('hidden');
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

function onSearch(code,city){
    const url = new URL(window.location.href);
    url.pathname="/pages/meteo.html";
    url.searchParams.set('insee',code);
    url.searchParams.set('city',city);
    document.location.href=url;
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
        let row_content = row.querySelectorAll("button");
        row_content[0].innerText = element['nom'];
        row_content[0].addEventListener("click",() => onSearch(element['code'],element['nom']));
        city_choice.appendChild(row);
    });

    // adds border radius to the last element of the list
    let last = Array.from(city_choice.children).pop();
    last.classList.add("rounded-br-lg");
    last.classList.add("rounded-bl-lg");
    city_choice.appendChild(last);
});
