var apiKey = "27b5c26487b921c1449252a26f2d4cc3";
var currentEl = document.getElementById("current-container");
var searchBtnEl = document.getElementById("searchBtn");
var cityInputEl = document.getElementById("cityInput");
var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon +"&appid=" + apiKey

function grabCity(city) {
var weatherApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey
};

function handleSearch(e) {
    if(!cityInputEl.value) {
        return;
    }
    e.preventDefault();
    var val = cityInputEl.value.trim();
    console.log(val);
    grabCity(val);
    cityInputEl.value = "";
};



searchBtnEl.addEventListener("submit", handleSearch);