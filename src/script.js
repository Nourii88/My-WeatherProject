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

function showForcast() {
let forcast = document.querySelector("#forcast");

let forcastHTML = "";
let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
days.forEach(function(day) {
  forcastHTML = forcastHTML + 
  `
  <div class="row">
              <div class="col">
                <div class="forcast-weekday">
              ${day}
              <br>
              <span
                  class="iconify"
                  data-icon="emojione:sun"
                  data-inline="false"
                ></span>
                <div class="forcast-temperatures">
                <span class="weather-forcast-temperature-max">4°</span>
                | <span class="weather-forcast-temperature-min">2°</span>
              </div>            
            </div>
          </div>
        </div>
        `;
})

      forcast.innerHTML = forcastHTML;
}

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let h1 = document.querySelector("#celsius");
  h1.innerHTML = `${temperature}`;
  let att1 = document.querySelector("#description");
  att1.innerHTML = `${response.data.weather[0].description}`;
  let att2 = document.querySelector("#humidity");
  att2.innerHTML = `${response.data.main.humidity}%`;
  let att3 = document.querySelector("#wind");
  att3.innerHTML = `${response.data.wind.speed}mph`;
}

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location");
  let city = document.querySelector(".city");
  let location = input.value;
  city.innerHTML = location[0].toUpperCase() + location.slice(1);
  let apiKey = "d9dbc4246c91e5e8565c5d56a1d1c468";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

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
}



function retrievePosition(position) {
  let apiKey = "d9dbc4246c91e5e8565c5d56a1d1c468";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);
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


showForcast();