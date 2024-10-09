let settings_button = document.getElementById('settings_button');
let settings_page = document.getElementById('settings_page');

let settings_object = document.getElementById('settings_object');

settings_object.addEventListener('load', () => {
    let croix = settings_object.contentDocument.getElementById('croix');
    
    croix.addEventListener('click', () => {
        settings_page.classList.toggle('hidden');
    });
});

settings_button.addEventListener('click', () => {
    settings_page.classList.toggle('hidden');
});
