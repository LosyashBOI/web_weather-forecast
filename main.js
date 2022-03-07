import {UI_ELEMENTS} from './view.js';

const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';

function getCity() {
    const cityName = UI_ELEMENTS.INPUT.value;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    let promise = fetch(url);
    let json = promise.then(response => response.json());
    
    return json;
}

function kelvinToCelsius(temp) {
    let tempC = Math.round(temp - 273.15);
    return tempC;
}

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