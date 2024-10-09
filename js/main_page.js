let settings_button = document.getElementById('settings_button');
let settings_page = document.getElementById('settings_page');

let settings_object = document.getElementById('settings_object');

settings_object.addEventListener('load', () => {
    let close = settings_object.contentDocument.getElementById('close');
    
    close.addEventListener('click', () => {
        settings_page.classList.toggle('hidden');
    });
});

settings_button.addEventListener('click', () => {
    settings_page.classList.toggle('hidden');
});
