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

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#celcius");
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
  let temp = document.querySelector("#celcius");
  let currentTemp = Math.round(response.data.main.temp);
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

let button = document.querySelector("#location-button");
button.addEventListener("click", showCurrentLocation);
