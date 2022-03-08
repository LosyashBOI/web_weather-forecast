import {UI_ELEMENTS} from "./view.js";

// const API_KEY = '1041b355b3b6422eb66d9f5e517f7b52';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getCity() {
    const cityName = UI_ELEMENTS.INPUT.value;
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

    let json = fetch(url).then(response => response.json());
    
    return json;
}

function kelvinToCelsius(temp) {
    let tempC = Math.round(temp - 273.15);
    return tempC;
}

function showWeatherNow(event) {
    getCity().then(city => {
        const DEGREE_SIGN = '&#176;'

        UI_ELEMENTS.TEMP_NOW.innerHTML = `${kelvinToCelsius(city.main.temp)}${DEGREE_SIGN}`;
        UI_ELEMENTS.CITY_NOW.textContent = city.name;
    });

    event.preventDefault();
}

UI_ELEMENTS.SUBMIT.addEventListener('click', showWeatherNow);