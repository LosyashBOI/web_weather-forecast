import { UI_ELEMENTS, showWeatherFromFavorite } from "./view.js";
import { favoriteList } from "./storage.js";
import { SERVER } from "./server.js";
import { format } from 'date-fns';

// const DEFAULT_URL_MAIN = 'https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=1041b355b3b6422eb66d9f5e517f7b52';
// const DEFAULT_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=moscow&cnt=4&appid=1041b355b3b6422eb66d9f5e517f7b52';

const kelvinToCelsius = function(temp) {
    let tempC = Math.round(temp - 273.15);
    
    return tempC;
}

function getTime(time) {
    const unixTime = (time - 10800) * 1000; //for Moscow 
    const date = new Date(unixTime);

    let hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();

    return `${hours}:${minutes}`;
}

function getDate(time) {
    const date = new Date(time);
    // const day = date.toLocaleString('en-US', {day: '2-digit', month: 'long'});
    const day = format(date, 'LLLL d');
    
    return day;
}

// export async function showNow(serverUrl, cityName) {
//     await jsonWeather(serverUrl, cityName).then(city => {
//         if (!city.name) {
//             throw new Error(city.message)
//         } else {
//             UI_ELEMENTS.TEMP_NOW.textContent = `${kelvinToCelsius(city.main.temp)}°`;
//             UI_ELEMENTS.CITY_NOW.textContent = city.name;
//             // console.log(city)
//         }
//     }).catch(alert);
// }

export async function showNow(serverUrl, cityName) {
    let city = await jsonWeather(serverUrl, cityName);

    try {
        if (!city.name) {
            throw new Error(city.message)
        } else {
            UI_ELEMENTS.TEMP_NOW.textContent = `${kelvinToCelsius(city.main.temp)}°`;
            UI_ELEMENTS.CITY_NOW.textContent = city.name;
            // console.log(city)
        }
    } catch (err) {
        alert(err);
    }
}

export function showDetails(serverUrl, cityName) {
    jsonWeather(serverUrl, cityName).then(city => {
        UI_ELEMENTS.DETAILS_TEMP.textContent = `${kelvinToCelsius(city.main.temp)}°`;
        UI_ELEMENTS.DETAILS_FEELS.textContent = `${kelvinToCelsius(city.main.feels_like)}°`;
        UI_ELEMENTS.DETAILS_WEATHER.textContent = city.weather[0].main;
        UI_ELEMENTS.DETAILS_CITY.textContent = city.name;

        const sunriseTime = getTime(city.sys.sunrise);
        const sunsetTime = getTime(city.sys.sunset);

        UI_ELEMENTS.DETAILS_SUNRISE.textContent = sunriseTime;
        UI_ELEMENTS.DETAILS_SUNSET.textContent = sunsetTime;
    });
}

export function showForecast(serverUrl, cityName) {
    jsonWeather(serverUrl, cityName).then(weather => {
        UI_ELEMENTS.FORECAST_CITY.textContent = weather.city.name;

        for (let i = 0; i < UI_ELEMENTS.FORECAST_ITEMS.length; i++) {
            let city = {
                date: getDate(weather.list[i].dt_txt),
                time: getTime(weather.list[i].dt),
                temp: `${kelvinToCelsius(weather.list[i].main.temp)}°`,
                feels: `${kelvinToCelsius(weather.list[i].main.feels_like)}°`,
                condition: weather.list[i].weather[0].main
            }
            
            UI_ELEMENTS.FORECAST_DATE[i].textContent = city.date;
            UI_ELEMENTS.FORECAST_TIME[i].textContent = city.time;
            UI_ELEMENTS.FORECAST_TEMP[i].firstElementChild.textContent = city.temp;
            UI_ELEMENTS.FORECAST_FEELS[i].firstElementChild.textContent = city.feels;
            UI_ELEMENTS.FORECAST_WEATHER[i].textContent = city.condition;
        }
        console.log(weather);
    });
}

export function addFavorite() {
    let cityName = UI_ELEMENTS.CITY_NOW.textContent;
    
    try {
        if ( favoriteList.has(cityName) ) {
            throw new Error('this city is already on the list')
        } else {
            favoriteList.add(cityName);
            localStorage.setItem('favorites', JSON.stringify([...favoriteList]));
            createFavorite(cityName);
        }
    } catch (err) {
        alert(err)
    }
}

export function createFavorite(cityName) {
    let newFavoriteItem = document.createElement('li');
    newFavoriteItem.className = 'weather__locations-list-item flex';
    newFavoriteItem.innerHTML = `<button class="weather__locations-favorite-btn">${cityName}</button><button class="weather__location-del"></button>`;
    UI_ELEMENTS.FAVORITE_LIST.append(newFavoriteItem);

    newFavoriteItem.firstElementChild.addEventListener('click', showWeatherFromFavorite);
    newFavoriteItem.lastElementChild.addEventListener('click', deleteFavorite);
}

export function deleteFavorite(event) {
    const favItem = event.currentTarget.parentElement;
    const cityName = favItem.firstChild.textContent;
    favoriteList.delete(cityName);
    
    localStorage.setItem('favorites', JSON.stringify([...favoriteList]) );
    // console.log(favoriteList)

    favItem.remove();
}

async function jsonWeather(serverUrl, cityName) {
    const url = `${serverUrl}?q=${cityName}&cnt=4&appid=${SERVER.API_KEY}`;
    const json = await fetch(url).then(response => response.json());

    return json;
}

// export {favoriteList};
