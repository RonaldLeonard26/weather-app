const daily = document.getElementById('daily')
const cityDisplay = document.getElementById('city-display')
const day = document.getElementById('day')
const date = document.getElementById('date')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
const appTemperatur = document.getElementById('app-temperatur')
const icon = document.getElementById('icon')
const wind = document.getElementById('wind')
const humidityDisplay = document.getElementById('humidity-display')
const uv = document.getElementById('uv')
const visibilityDisplay = document.getElementById('visibility-display')
const cityName = document.getElementById('city-name')
const sunriseDisplay = document.getElementById('sunrise-display')
const sunsetDisplay = document.getElementById('sunset-display')





const formattedDate = (date) => {
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
    
    const newDate = new Date (date);
    return newDate.toLocaleString("id-ID", options);
}

const getWeather = async (latitude, longitude) => {

    const URL =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,uv_index_max,sunset&hourly=visibility&current=apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,temperature_2m`;

    
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    date.innerText = formattedDate(data.current.time);
    icon.src = WMO[data.current.weather_code].night.image;
    temperature.innerText = data.current.temperature_2m + ' °C';
    description.innerText = WMO[data.current.weather_code].night.description;
    appTemperatur.innerText = data.current.apparent_temperature + ' °C';
    wind.innerText = data.current.wind_speed_10m + ' km/h';
    humidityDisplay.innerText = data.current.relative_humidity_2m + ' %';
    sunriseDisplay.innerText = data.daily.sunrise[0];
    sunsetDisplay.innerText = data.daily.sunset[0];
    uv.innerText = data.daily.uv_index_max[0] + ' uv'
    

    daily.innerHTML = ''

    for (let i = 1; i < data.daily.time.length; i++) {
        daily.innerHTML += 
        `<div class="sunday" id="daily">
        <p>${formattedDate(data.daily.time[i])}</p>
        <img src="${ WMO[data.daily.weather_code[i]].night.image}">
        <p>${ WMO[data.daily.weather_code[i]].night.description}</p>
        <p>${data.daily.temperature_2m_max[i]} °C</p>
        </div>`
        
    }
    
}

const getGeocoding = async () => {
    let city = cityName.value
    cityDisplay.innerText = city
    document.getElementById('btn-city').value = " "
    

    const GEOCODING_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`

    const res = await fetch(GEOCODING_URL)
    const data = await res.json()
    
    let latitude = data.results[0].latitude
    let longitude = data.results[0].longitude

    getWeather(latitude, longitude);
    
}

function getLocation () {
    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude
        getWeather(latitude, longitude);
    })
}

getLocation()