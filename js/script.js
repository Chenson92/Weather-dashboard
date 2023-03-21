var input = $("#input");
var button = $("#button");
var APIKey = "e8b739b8a413d594450643b0f45fdea0";
var cityName = $("#target-city");
var currentTemp = $("#temp");
var currentWind = $("#wind");
var currentHum = $("#humidity");

// Search the weather of current city & display the results
button.on("click", function () {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input.val() +
    "&APPID=" +
    APIKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentTemp.text(data.main.temp);
      currentWind.text(data.wind.speed);
      currentHum.text(data.main.humidity);
      var today = dayjs().format("M/D/YYYY");
      var weatherImg = data.weather[0].icon;
      var imgUrl =
        "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
      cityName.html(data.name + "(" + today + ")" + "<img src=" + imgUrl + ">");
    });
});
//localStorage to keep search data under as a list

//5 days weather forecast

/* 
  var forecast = {
  days: 'date1', 'date2','date3','date4','date5',
  img: 'img1', 'img2', 'img3','img4','img5',
  temperature: 'temp1','temp2','temp3','temp4','temp5',
  windy: 'wind1','wind2','wind3','wind4','wind5',
  humid: 'humidity1','humidity2','humidity3','humidity4','humidity5'
};
function forecast() {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast/daily?" +
    "q=" +
    input.val() +
    "&APPID=" +
    APIKey;

  fetch(forecastUrl);
}
function getWeatherData() {
  let headers = new Headers();

  return fetch(forecastUrl, {
    method: "GET",
    headers: headers,
  }).then((data) => {
    return data.json();
  });
}
getWeatherData().then(weatherData => {
  let city = weatherData.city.name;
  let dailyForecast = weatherData.list;*/

button.click(function () {
  var city = input.val();

  // Construct the API endpoint URL to include temperature, icon, wind, and humidity
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=" +
    APIKey;

  // Call the API and handle the response
  $.getJSON(url, function (data) {
    // Extract the list of forecasts from the API response
    var forecasts = data.list;

    // Loop through the 5-day forecast data and display the relevant information

    for (var i = 0; i < 5; i++) {
      var forecast = forecasts[i];
      var date = new Date(forecast.dt * 1000);
      var dateString = date.toLocaleDateString();
      var temp = Math.round(forecast.main.temp);
      // Temperature in Celsius
      //var description = forecast.weather[0].description;
      var iconCode = forecast.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

      var wind = forecast.wind.speed; // Wind speed in m/s
      var humidity = forecast.main.humidity;
      // Humidity in %

      // Update the HTML display with the weather forecast data
      $("#date" + (i + 1)).html(dateString);
      $("#img" + (i + 1)).attr("src", iconUrl);
      $("#temp" + (i + 1)).html(temp + "&deg;C");
      $("#wind" + (i + 1)).html(wind + " m/s");
      $("#humidity" + (i + 1)).html(humidity + "%");
    }
  });
});
