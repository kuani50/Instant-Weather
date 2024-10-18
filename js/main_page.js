import { search } from "./api_postal_code.js";

const settings_button = document.getElementById('settings_button');
const settings_page = document.getElementById('settings_page');
const settings_object = document.getElementById('settings_object');
const search_bar = document.getElementById('search_bar');
const city_choice = document.getElementById('city_choice');
const row_template = document.getElementById('row_template');

setupLocalStorage();

// Setups the closing button of the settings when the settings page is loaded
settings_object.addEventListener('load', () => {
    const close = settings_object.contentDocument.getElementById('close');
    close.addEventListener('click', () => {
        settings_page.classList.toggle('hidden');
    });
});


// Manages the button to open the settings
settings_button.addEventListener('click', () => {
    settings_page.classList.toggle('hidden');
});

// Setups the local storage when no settings have been chosen yet
function setupLocalStorage(){
    if(localStorage.getItem("latitudeAndLongitude") == null){
        localStorage.setItem("latitudeAndLongitude", false);
        localStorage.setItem("rain", false);
        localStorage.setItem("windSpeed", false);
        localStorage.setItem("windDirection", false);
        localStorage.setItem("nbDays", "1");
    }
}

// Redirects to the weather page with the chosen city
function onSearch(code,city){
    const url = new URL(window.location.href);
    url.pathname="/pages/meteo.html";
    url.searchParams.set('insee',code);
    url.searchParams.set('city',city);
    document.location.href=url;
}


// Displays the available search results
search_bar.addEventListener('input', async () => {
    const input = search_bar.value;
    if(/\d/.test(input)){
        if(input.length>5) search_bar.value=input.slice(0,-1);
        if((input.length != 5)) return;
    }

    if(input.length == 0){
        city_choice.innerHTML = '';
        search_bar.parentNode.classList.add("rounded-b-[25px]");
        return;
    }
    let result = await search(input);
    city_choice.innerHTML = '';
    
    if(result.length > 0 && search_bar.value.length > 0){
        search_bar.parentNode.classList.remove("rounded-b-[25px]");
    }else{
        search_bar.parentNode.classList.add("rounded-b-[25px]");
        return;
    }
    
    
    let names = new Set();
    Array.from(result).forEach(element => {
        if(!names.has(element['nom'])){
            names.add(element['nom']);
            let row = row_template.content.cloneNode(true);
            let row_content = row.querySelectorAll("button");
            row_content[0].innerText = element['nom'];
            row_content[0].addEventListener("click",() => onSearch(element['code'],element['nom']));
            city_choice.appendChild(row);
        }
    });

    // Adds border radius to the last element of the list
    let last = Array.from(city_choice.children).pop();
    if(last){
        last.classList.add("rounded-b-[25px]");
        city_choice.appendChild(last);
    }
    
});
