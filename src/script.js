let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December"
];

let month = months[today.getMonth()];
let year = today.getFullYear();
let day = days[today.getDay()];
let date = today.getDate();

let currentDate = document.querySelector("div .date");
currentDate.innerHTML = ` ${date} ${month} ${year}`;

let hours = today.getHours();
let hours2 = (hours < 10 ? "0" : "") + hours;
let minutes = today.getMinutes();
let minutes2 = (minutes < 10 ? "0" : "") + minutes;

let currentTime = document.querySelector("div .time");
currentTime.innerHTML = `${day} ${hours2}:${minutes2}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
let forecast = response.data.daily;  

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 5) {
  forecastHTML = forecastHTML + 
  `
           <div class="col">
                <div class="forecast-weekday">
              ${formatDay(forecastDay.dt)}         
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="35"/></div> 
              <div class="forecast-temperatures">
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                | <span class="forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>         
            </div>
          </div>
        </div>
        `;
                }
})
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
}

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location");
  let city = document.querySelector(".city");
  let location = input.value;
  city.innerHTML = location[0].toUpperCase() + location.slice(1);
  searchCity(location)
}

function searchCity(city){
  let apiKey = "d9dbc4246c91e5e8565c5d56a1d1c468"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}
searchCity("Amsterdam")
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function getForecast(coordinates) {
  let apiKey = "d9dbc4246c91e5e8565c5d56a1d1c468";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showCurrentTemp(response) {
  let temp = document.querySelector("#celsius");
  celsiusTemp = response.data.main.temp;
  let currentTemp = Math.round(celsiusTemp);
  temp.innerHTML = ` ${currentTemp}`;
  let location = document.querySelector(".city");
  location.innerHTML = `${response.data.name}`;
  let att1 = document.querySelector("#description");
  att1.innerHTML = `${response.data.weather[0].description}`;
  let att2 = document.querySelector("#humidity");
  att2.innerHTML = `${response.data.main.humidity}%`;
  let att3 = document.querySelector("#wind");
  att3.innerHTML = `${response.data.wind.speed}mph`;
  let att4 = document.querySelector("#sunrise");
  att4.innerHTML = `${new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(('en-IN'), { hour: "2-digit", minute: "2-digit" })}`;
  let att5 = document.querySelector("#sunset");
  att5.innerHTML = `${new Date(response.data.sys.sunset * 1000).toLocaleTimeString(('en-IN'), { hour: "2-digit", minute: "2-digit" })}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`

    );
  icon.setAttribute("alt", response.data.weather[0].description);  

  getForecast(response.data.coord);
}


function retrievePosition(position) {
  let apiKey = "d9dbc4246c91e5e8565c5d56a1d1c468";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);

  let urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(showForecast);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showFahrenheitTemp(event) {
event.preventDefault();
let temperature = document.querySelector("#celsius");

celsiusConverter.classList.remove("active");
fahrenheitConverter.classList.add("active");
let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
 event.preventDefault();
 celsiusConverter.classList.add("active");
 fahrenheitConverter.classList.remove("active");
 let temperature = document.querySelector("#celsius");
 temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;


let button = document.querySelector("#location-button");
button.addEventListener("click", showCurrentLocation);

let fahrenheitConverter = document.querySelector("#fahrenheit-converter");
fahrenheitConverter.addEventListener("click", showFahrenheitTemp);

let celsiusConverter = document.querySelector("#celsius-converter");
celsiusConverter.addEventListener("click", showCelsiusTemp);

changeBackground();