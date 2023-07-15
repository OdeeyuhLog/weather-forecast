export default function populateSections(data, unit = "C") {
    setLocation(data);
    setTimeValues(data);
    setWeatherStatus(data);
    setTemperatureValues(data, unit);
}

function setLocation(data) {
    const location = document.getElementById("location-display");
    location.textContent = `${data.location.name}, ${data.location.country}`;
}

function setTimeValues(data) {
    const time = document.getElementById("time-display");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    time.textContent = `As of ${data.date} ${data.currentTime}`;
    sunrise.textContent = data.sunrise;
    sunset.textContent = data.sunset;
}

function setWeatherStatus(data) {
    const status = document.getElementById("status-display");
    const icon = document.getElementById("icon-display");
    status.textContent = data.weather.status;
}

function setTemperatureValues(data, unit = "C") {
    const temperature = document.getElementById("temp-display");
    const minTemp = document.getElementById("min_temp");
    const maxTemp = document.getElementById("max_temp");
    const feelsLike = document.getElementById("feels");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");

    if (unit === "F") {
        temperature.textContent = `${data.temp.f} °F`;
        minTemp.textContent = `${data.temp_min.f} °F`;
        maxTemp.textContent = `${data.temp_max.f} °F`;
        feelsLike.textContent = `${data.feels.f} °F`;
        humidity.textContent = `${data.humidity}%`;
        windSpeed.textContent = `${data.wind_speed} km/h`;
    } else {
        temperature.textContent = `${data.temp.c} °C`;
        minTemp.textContent = `${data.temp_min.c} °C`;
        maxTemp.textContent = `${data.temp_max.c} °C`;
        feelsLike.textContent = `${data.feels.c} °C`;
        humidity.textContent = `${data.humidity}%`;
        windSpeed.textContent = `${data.wind_speed} km/h`;
    }
}
