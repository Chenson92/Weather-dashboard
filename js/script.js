var input = $("#input");
var button = $("#button");
var APIKey = "e8b739b8a413d594450643b0f45fdea0";
var cityName = $("#target-city");
var currentTemp = $("#temp");
var currentWind = $("#wind");
var currentHum = $("#humidity");
var historyList = $("#search-history");

// Search the weather of current city & display the results
button.on("click", function () {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input.val() +
    " &units=metric&appid=" +
    APIKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentTemp.text(data.main.temp + " °C");
      currentWind.text(data.wind.speed + " m/s");
      currentHum.text(data.main.humidity + " %");
      var today = dayjs().format("M/D/YYYY");
      var weatherImg = data.weather[0].icon;
      var imgUrl =
        "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
      cityName.html(data.name + "(" + today + ")" + "<img src=" + imgUrl + ">");
    });
});

button.on("click", function () {
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

    //  5 days forecast data and display the relevant information

    for (var i = 0; i < 5; i++) {
      var forecast = forecasts[i];
      var date = new Date(forecast.dt * 1000);
      var dateString = date.toLocaleDateString();
      dateString = dayjs(date).add(i, "day").format("MM-DD-YY");

      var temp = Math.round(forecast.main.temp);
      
      //var description = forecast.weather[0].description;
      var iconCode = forecast.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      console.log(iconCode);
      console.log(iconUrl);
      var wind = forecast.wind.speed;
      var humidity = forecast.main.humidity;

      // display with the weather forecast data
      $("#date" + (i + 1)).html(dateString);
      $("#img" + (i + 1)).attr("src", iconUrl);
      $("#temp" + (i + 1)).html(temp + "&deg;C");
      $("#wind" + (i + 1)).html(wind + " m/s");
      $("#humidity" + (i + 1)).html(humidity + " %");
    }
  });
});

//localStorage to keep search data under as a list

button.on("click", function (event) {
  var savedHistory = JSON.parse(localStorage.getItem("history"));
  event.preventDefault();
  var inputValue = input.val();
  
  if (!inputValue == null) {
    savedHistory.push(inputValue);
    localStorage.setItem("history", JSON.stringify(savedHistory));
    console.log(savedHistory);
    //add input value to history list
    var historyItem = $("<li>");
    historyItem.text() = inputValue;
    historyList.append(historyItem);
  }
});
