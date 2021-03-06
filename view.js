import { showNow, showDetails, showForecast, addFavorite, deleteFavorite } from "./main.js";
import { showStorage, currentCity } from "./storage.js";
import { SERVER } from "./server.js";

export const UI_ELEMENTS = {
    INPUT: document.querySelector('.form__input'),
    SUBMIT: document.querySelector('.form__search-btn'),
    ADD_TO_FAVORITE: document.querySelector('.tab-now__add-to-fav'),
    DELETE_FAVORITE: document.querySelectorAll('.weather__location-del'),
    
    FAVORITE_LIST: document.querySelector('.weather__locations-list'),
    FAVORITE_CITIES: document.querySelectorAll('.weather__locations-favorite-btn'),
    
    TEMP_NOW: document.querySelector('.header_now'),
    CITY_NOW: document.querySelector('.tab-now__city'),
    
    DETAILS_CITY: document.querySelector('.header_details'),
    DETAILS_TEMP: document.querySelector('.details__temp'),
    DETAILS_FEELS: document.querySelector('.details__feels'),
    DETAILS_WEATHER: document.querySelector('.details__weather'),
    DETAILS_SUNRISE: document.querySelector('.details__sunrise'),
    DETAILS_SUNSET: document.querySelector('.details__sunset'),
    
    FORECAST_CITY: document.querySelector('.header_forecast'),
    FORECAST_DATE: document.querySelectorAll('.tab-forecast__date'),
    FORECAST_TIME: document.querySelectorAll('.tab-forecast__time'),
    FORECAST_TEMP: document.querySelectorAll('.tab-forecast__temp'),
    FORECAST_FEELS: document.querySelectorAll('.tab-forecast__feels'),
    FORECAST_WEATHER: document.querySelectorAll('.tab-forecast__weather'),
    FORECAST_ITEMS: document.querySelectorAll('.tab-forecast__list-item'),
};

export function showWeatherFromFavorite(event) {
    showNow(SERVER.URL_MAIN, event.currentTarget.textContent);
    showDetails(SERVER.URL_MAIN, event.currentTarget.textContent);
    showForecast(SERVER.URL_FORECAST, event.currentTarget.textContent);

    localStorage.setItem('currentCity', event.currentTarget.textContent);
    
    event.preventDefault();
}

// const favoriteList = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

// for (let city of UI_ELEMENTS.FAVORITE_CITIES) {
//     favoriteList.push(city.textContent.trim());
// }

function showWeatherFromSearch(event) {
    showNow(SERVER.URL_MAIN, UI_ELEMENTS.INPUT.value);
    showDetails(SERVER.URL_MAIN, UI_ELEMENTS.INPUT.value);
    showForecast(SERVER.URL_FORECAST, UI_ELEMENTS.INPUT.value);
    
    localStorage.setItem('currentCity', UI_ELEMENTS.INPUT.value);

    event.preventDefault();
}

function showWeatherFromStorage(city) {
    showNow(SERVER.URL_MAIN, city);
    showDetails(SERVER.URL_MAIN, city);
    showForecast(SERVER.URL_FORECAST, city);
}

// function showWeatherDefault() {
//     const defaultCity = 'Moscow';

//     showNow(SERVER.URL_MAIN, defaultCity);
//     showDetails(SERVER.URL_MAIN, defaultCity);
//     showForecast(SERVER.URL_FORECAST, defaultCity);
// }


UI_ELEMENTS.SUBMIT.addEventListener('click', showWeatherFromSearch);
UI_ELEMENTS.ADD_TO_FAVORITE.addEventListener('click', addFavorite);


for (let btn of UI_ELEMENTS.FAVORITE_CITIES) {
    btn.addEventListener('click', showWeatherFromFavorite);
}

for (let btn of UI_ELEMENTS.DELETE_FAVORITE) {
    btn.addEventListener('click', deleteFavorite);
}

// showWeatherDefault();
showStorage();

if (currentCity) {
    showWeatherFromStorage(currentCity);
} else {
    showWeatherFromStorage(UI_ELEMENTS.CITY_NOW.textContent);
}

// export {favoriteList};