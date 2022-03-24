// import { favoriteList } from "./view.js";
import { createFavorite } from "./main.js";

const favoriteList = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

export function showStorage() {
    const favoriteCities = JSON.parse(localStorage.getItem('favorites'));
    
    favoriteCities.forEach(item => {
        createFavorite(item)
    });
    // localStorage.clear();
}

export {favoriteList};
