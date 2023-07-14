export default function populateSections(data) {
    const location = document.getElementById("location-display");
    const status = document.getElementById("status-display");
    const icon = document.getElementById("icon-display");
    const temperature = document.getElementById("temp-display");
    const minTemp = document.getElementById("min_temp");
    const maxTemp = document.getElementById("max_temp");
    const time = document.getElementById("time-display");
    const feelsLike = document.getElementById("feels");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");

    location.textContent = `${data.location.name}, ${data.location.country}`;
    status.textContent = data.weather.status;
    temperature.textContent = `${data.temp} C`;
    minTemp.textContent = `${data.temp_min} C`;
    maxTemp.textContent = `${data.temp_max} C`;
    time.textContent = `As of ${data.date} ${data.currentTime}`;
    feelsLike.textContent = `${data.feels} C`;
    sunrise.textContent = data.sunrise;
    sunset.textContent = data.sunset;
    humidity.textContent = data.humidity;
    windSpeed.textContent = data.wind_speed;
}
