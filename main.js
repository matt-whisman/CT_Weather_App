// 32301583c523cf99b110cf4ff5b384bb
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(searchForm);
  let city = formData.get("cityInput");
  console.log(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32301583c523cf99b110cf4ff5b384bb`
  );
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32301583c523cf99b110cf4ff5b384bb`
  )
    .then((result) => result.json())
    .then((data) => displayWeather(data))
    .catch((err) => console.error(err));
});

function displayWeather(data) {
  let tempCardEL = document.getElementById("tempCard");
  let forecastCardEL = document.getElementById("forecastCard");

  if (data.cod == "400") {
    tempCardEL.innerHTML = `
        <div class="card text-bg-light mb-3" id="tempCard">
                <div class="card-body">
                    <h4 class="card-title">Current Temp</h4>
                    <p class="card-text" id="temp">No data available</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="feelsLike">Feels like: No data available</li>
                        <li class="list-group-item" id="high">High:No data available </li>
                        <li class="list-group-item" id="low">Low: No data available</li>
                    </ul>
                </div>
            </div>
    `;

    forecastCardEL.innerHTML = `
        <div class="card text-bg-dark mb-3" id="forecastCard">
                <div class="card-body ">
                    <h4 class="card-title">Forecast</h4>
                    <p class="card-text">No Weather Data</p>
                    <ul class="list-group list-group-flush ">
                        <li class="list-group-item text-bg-dark">Description: No data available</li>
                        <li class="list-group-item text-bg-dark">Humidity: No data available</li>
                        <li class="list-group-item text-bg-dark">Pressure: No data available</li>
                        <li class="list-group-item text-bg-dark">Visibility: No data available</li>
                        <li class="list-group-item text-bg-dark">Wind Speed: No data available</li>
                    </ul>
                </div>
            </div>
    `;
    return
  }

  let tempHTML = "";
  let forecastHTML = "";

  let forecastMain = data.weather[0].main;
  let forecastDescription = data.weather[0].description;
  let temp = data.main.temp;
  let high = data.main.temp_max;
  let low = data.main.temp_min;
  let feelsLike = data.main.feels_like;
  let humidity = data.main.humidity;
  let pressure = data.main.pressure;
  let visibility = data.visibility;
  let windSpeed = data.wind.speed;

  tempHTML += `
        <div class="card text-bg-light mb-3" id="tempCard">
                <div class="card-body">
                    <h4 class="card-title">Current Temp</h4>
                    <p class="card-text" id="temp">${temp}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" id="feelsLike">Feels like: ${feelsLike}</li>
                        <li class="list-group-item" id="high">High: ${high}</li>
                        <li class="list-group-item" id="low">Low: ${low}</li>
                    </ul>
                </div>
            </div>
    `;

  forecastHTML += `
        <div class="card text-bg-dark mb-3" id="forecastCard">
                <div class="card-body ">
                    <h4 class="card-title">Forecast</h4>
                    <p class="card-text">${forecastMain}</p>
                    <ul class="list-group list-group-flush ">
                        <li class="list-group-item text-bg-dark">Description: ${forecastDescription}</li>
                        <li class="list-group-item text-bg-dark">Humidity: ${humidity}</li>
                        <li class="list-group-item text-bg-dark">Pressure: ${pressure}</li>
                        <li class="list-group-item text-bg-dark">Visibility: ${visibility}</li>
                        <li class="list-group-item text-bg-dark">Wind Speed: ${windSpeed}</li>
                    </ul>
                </div>
            </div>

    `;

  tempCardEL.innerHTML = tempHTML;
  forecastCardEL.innerHTML = forecastHTML;
}
