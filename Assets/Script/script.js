var apiKey = "27b5c26487b921c1449252a26f2d4cc3";
var currentEl = $("#current-container");
var searchBtnEl = $("#searchBtn");
var cityInputEl = $("#cityInput").val().trim();
var searchHistoryEl = $("#searchHistory")
var forecastEl = $(".forecast-container")
var timeDisplayEl = $("#currentDay")
var currentName = $("#current-name")

function displayTime() {
    var rightNow = moment().format("MMM DD, YYYY")
    timeDisplayEl.text(rightNow);
};
displayTime();

function handleSearch(e) {
    var cityInputEl = $("#cityInput").val().trim();
    currentName.html(cityInputEl)
    console.log(cityInputEl);
    e.preventDefault();
    if (cityInputEl) {
        grabCity(cityInputEl);
        searchHistory(cityInputEl);
        $("#cityInput").text("");
    }
    console.log(cityInputEl);
};

function grabCity(city) {
    var weatherApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    console.log(weatherApi);
    fetch(weatherApi)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            forecastGrab(data[0].lat, data[0].lon)
            console.log(data[0].lat, data[0].lon)
        })
};

function forecastGrab(lat, lon) {
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

function weatherData(data) {
    // var currentName = $("#current-name")
    // currentName.html(cityInputEl)
    var temperature = $("<p>")
    temperature.html("Temp: " + data.daily[0].temp.day + "°F")
    var humidityEl = $("<p>")
    humidityEl.html("Humidity: " + data.daily[0].humidity + "%")
    var windSpeed = $("<p>")
    windSpeed.html("Wind Speed: " + data.daily[0].wind_speed + "mph")
    currentName.append(temperature, humidityEl, windSpeed)

    for (var i = 1; i < 6; i++) {
        var forecastHeader = $("<h3>")
        var temperature = $("<p>")
        temperature.html("Temp: " + data.daily[i].temp.day + "°F")
        var humidityEl = $("<p>")
        humidityEl.html("Humidity: " + data.daily[i].humidity + "%")
        var windSpeed = $("<p>")
        windSpeed.html("Wind Speed: " + data.daily[i].wind_speed + "mph")
        currentName.append(temperature, humidityEl, windSpeed)
    }
}

function searchHistory() { }



searchBtnEl.on("click", handleSearch);