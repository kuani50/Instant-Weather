import { search } from "./api_postal_code.js";

const settingsButton = document.getElementById('settings_button');
const settingsPage = document.getElementById('settings_page');
const settingsObject = document.getElementById('settings_object');
const searchBar = document.getElementById('search_bar');
const cityChoice = document.getElementById('city_choice');
const rowTemplate = document.getElementById('row_template');

setupLocalStorage();

// Setups the closing button of the settings when the settings page is loaded
settingsObject.addEventListener('load', () => {
    const close = settingsObject.contentDocument.getElementById('close');
    close.addEventListener('click', () => {
        settingsPage.classList.toggle('hidden');
    });
});


// Manages the button to open the settings
settingsButton.addEventListener('click', () => {
    settingsPage.classList.toggle('hidden');
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
    url.pathname="/pages/weather.html";
    url.searchParams.set('insee',code);
    url.searchParams.set('city',city);
    document.location.href=url;
}


// Displays the available search results
searchBar.addEventListener('input', async () => {
    const input = searchBar.value;
    if(/\d/.test(input)){
        if(input.length>5) searchBar.value=input.slice(0,-1);
        if((input.length != 5)) return;
    }

    if(input.length == 0){
        cityChoice.innerHTML = '';
        searchBar.parentNode.classList.add("rounded-b-[25px]");
        return;
    }
    let result = await search(input);
    cityChoice.innerHTML = '';
    
    if(result.length > 0 && searchBar.value.length > 0){
        searchBar.parentNode.classList.remove("rounded-b-[25px]");
    }else{
        searchBar.parentNode.classList.add("rounded-b-[25px]");
        return;
    }
    
    
    let names = new Set();
    Array.from(result).forEach(element => {
        if(!names.has(element.nom)){
            names.add(element.nom);
            let row = rowTemplate.content.cloneNode(true);
            let rowContent = row.querySelectorAll("button");
            rowContent[0].innerText = element.nom;
            rowContent[0].addEventListener("click",() => onSearch(element.code,element.nom));
            cityChoice.appendChild(row);
        }
    });

    // Adds border radius to the last element of the list
    let last = Array.from(cityChoice.children).pop();
    if(last){
        last.classList.add("rounded-b-[25px]");
        cityChoice.appendChild(last);
    }
    
});
