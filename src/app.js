function updateDate(date) {
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfTheWeek = daysOfTheWeek[date.getDay()];
  let dateOfTheWeek = date.getDate();
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
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hour}:${minutes}`;

  let year = date.getFullYear();
  let formattedDate = ` ${dayOfTheWeek} ${dateOfTheWeek} ${month} ${year} ${currentTime}`;
  return formattedDate;
}

function injectDate(date) {
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = updateDate(date);
}

injectDate(new Date());
function updateTemp(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}
function updateWind(response) {
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
}
function updateHumidity(response) {
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}
function updateCity(city) {
  let cityName = document.querySelector("#city-name");
  if (city) {
    cityName.innerHTML = city;
  }
  let apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTemp);
  axios.get(apiUrl).then(updateWind);
  axios.get(apiUrl).then(updateHumidity);
}
function searchCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-change-city");
  let input = userInput.value;
  input = input.trim();
  let inputFirst = input.charAt(0).toUpperCase();
  let inputRest = input.toLowerCase();
  input = inputFirst + inputRest.substr(1);

  updateCity(input);
}

let userCity = document.querySelector("#user-city");
userCity.addEventListener("submit", searchCity);

//function changeTemp(event) {
// event.preventDefault();
//let temperature = document.querySelector("#current-temperature");
//temperature.innerHTML = `37`;
//let celsiusTemp = document.querySelector("#celsius");
//celsiusTemp.innerHTML = `°C `;
//event.target.innerHTML = `<strong>°F</strong>`;
//}
//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", changeTemp);

//function changeTempBack(event) {
//event.preventDefault();
//event.target.innerHTML = `<strong>°C </strong>`;
//let temperature = document.querySelector("#current-temperature");
//temperature.innerHTML = `3`;
//let fahrenTemp = document.querySelector("#fahrenheit");
//fahrenTemp.innerHTML = `°F`;
//}
//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", changeTempBack);

let apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
let city = "paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(updateTemp);
axios.get(apiUrl).then(updateWind);
axios.get(apiUrl).then(updateHumidity);

function displayLocation(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
}
function calcCoords(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `62f780f73f5ee00aa0f4d27f32e096c2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateTemp);
  axios.get(apiUrl).then(updateWind);
  axios.get(apiUrl).then(updateHumidity);
  axios.get(apiUrl).then(displayLocation);
}
function findCoords() {
  navigator.geolocation.getCurrentPosition(calcCoords);
}
let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", findCoords);
