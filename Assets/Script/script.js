var apiKey = "27b5c26487b921c1449252a26f2d4cc3";
var currentEl = document.getElementById("current-container");
var searchBtnEl = document.getElementById("searchBtn");
var cityInputEl = document.getElementById("cityInput");

function grabCity(city) {
    var weatherApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(weatherApi)
    .then(function(res) {
        return res.json();
    }).then(function(data) {
        forecastGrab(data.lat, data.lon)
    })
};

function forecastGrab(lat, lon,) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon +"&appid=" + apiKey;
    fetch(forecastApi)
}

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