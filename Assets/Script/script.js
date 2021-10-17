var apiKey = "27b5c26487b921c1449252a26f2d4cc3";
var currentEl = $("#current-container");
var searchBtnEl = $("#searchBtn");
var cityInputEl = $("#cityInput").val().trim();
var searchHistoryEl = $("#searchHistory")
var forecastEl = $(".forecast-container")
var timeDisplayEl = $("#currentDay")
var currentName = $("#current-name")
var rightNow = moment().format("MMM DD, YYYY")
var divTag1 = $("#d1")
// var divTag2 = $("#d2")

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
    var temperature = $("<p>");
    temperature.html("Temp: " + data.daily[0].temp.day + "°F");
    var humidityEl = $("<p>");
    humidityEl.html("Humidity: " + data.daily[0].humidity + "%");
    var windSpeed = $("<p>");
    windSpeed.html("Wind Speed: " + data.daily[0].wind_speed + "mph");
    divTag1.append(temperature, humidityEl, windSpeed);

    for (var i = 1; i < 6; i++) {
        var foreCast = $("#forecast");
        var forecastHeader = $("<section>");
        forecastHeader.html( moment(data.daily[i].dt * 1000).format("M/D"));
        var temperatureCast = $("<p>");
        temperatureCast.html("Temp: " + data.daily[i].temp.day + "°F");
        var humidityElCast = $("<p>");
        humidityElCast.html("Humidity: " + data.daily[i].humidity + "%");
        var windSpeedCast = $("<p>");
        windSpeedCast.html("Wind Speed: " + data.daily[i].wind_speed + "mph");
        foreCast.append(forecastHeader);
        forecastHeader.append(temperatureCast, humidityElCast, windSpeedCast);
    }
}

function searchHistory(cityInputEl) {
    var historyBtn = $("<button>");
    historyBtn.html(cityInputEl);
    historyBtn.attr("type", "submit");
    historyBtn.attr("class", "history");
    historyBtn.attr("city-name");
    var saved = JSON.parse(localStorage.getItem("searchTerm")) || [];
    saved.push(cityInputEl);
    localStorage.setItem("searchTerm", JSON.stringify(saved));

}



searchBtnEl.on("click", handleSearch);