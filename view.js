import {getCity, kelvinToCelsius} from "./main.js";

const UI_ELEMENTS = {
    INPUT: document.querySelector('.form__input'),
    SUBMIT: document.querySelector('.form__search-btn'),
    TEMP_NOW: document.querySelector('.header_now'),
    CITY_NOW: document.querySelector('.tab-now__city'),
};

function showWeatherNow(event) {
    
    getCity().then(city => { 
        UI_ELEMENTS.CITY_NOW.textContent = city.name;
    });
    
    getCity().then(city => {
        let temp = city.main.temp;
        let degreeSing = '&#176;'
        
        UI_ELEMENTS.TEMP_NOW.innerHTML = `${kelvinToCelsius(temp)}${degreeSing}`;
    });
    event.preventDefault();
}

UI_ELEMENTS.SUBMIT.addEventListener('click', showWeatherNow);
