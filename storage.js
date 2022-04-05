// import { favoriteList } from "./view.js";
import { createFavorite } from "./main.js";

const currentCity = localStorage.getItem('currentCity');
const favoriteList = new Set( JSON.parse(localStorage.getItem('favorites')) );

export function showStorage() {
    // console.log(favoriteList);
    
    if (favoriteList) {
        favoriteList.forEach(item => {
            createFavorite(item)
        });
    }
    // favoriteList.clear();
    // localStorage.clear();
}

export {favoriteList, currentCity};
