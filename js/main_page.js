let settings_button = document.getElementById('settings_button');
let settings_page = document.getElementById('settings_page');

let settings_object = document.getElementById('settings_object');

setupLocalStorage();

settings_object.addEventListener('load', () => {
    let close = settings_object.contentDocument.getElementById('close');
    
    close.addEventListener('click', () => {
        settings_page.classList.toggle('hidden');
    });

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

settings_button.addEventListener('click', () => {
    settings_page.classList.toggle('hidden');
});

function setupLocalStorage(){
    if(localStorage.getItem("latitudeAndLongitude") == null){
        localStorage.setItem("latitudeAndLongitude", false);
        localStorage.setItem("rain", false);
        localStorage.setItem("windSpeed", false);
        localStorage.setItem("windDirection", false);
    }
}