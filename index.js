const daily = document.getElementById('daily')




const URL =`https://api.open-meteo.com/v1/forecast?latitude=-5.1486&longitude=119.4319&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,uv_index_max,sunset&hourly=visibility&current=apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,temperature_2m`;

const getWeather = async () => {
    
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    
    
    for (let i = 1; i < data.daily.time.length; i++) {
        daily.innerHTML += 
        `<div class="sunday" id="daily">
        <p>${data.daily.time[i]}</p>
        <img src="cloudy_5111006.png" alt="cloudy">
        <p>${data.daily.temperature_2m_max[i]} °C</p>
        </div>`
        
    }
    
}

getWeather();