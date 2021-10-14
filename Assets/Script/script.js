var apiKey = "27b5c26487b921c1449252a26f2d4cc3";
var currentEl = $("#current-container");
var searchBtnEl = $("#searchBtn");
var cityInputEl = $("#cityInput").val().trim();
var searchHistoryEl = $("#searchHistory")
var forecastEl = $(".forecast-container")

function handleSearch(e) {
    if (!cityInputEl) {
        return;
    } else {
        e.preventDefault();
        grabCity(cityInputEl);
        searchHistory(cityInputEl);
        cityInputEl.html("");
    }
};

function grabCity(city) {
    var weatherApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(weatherApi)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            forecastGrab(data.lat, data.lon)
        })
};

function forecastGrab(lat, lon,) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastApi)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        weatherData(data);
    })
}

function weatherData() {} 


function searchHistory() {}


searchBtnEl.addEventListener("submit", handleSearch);