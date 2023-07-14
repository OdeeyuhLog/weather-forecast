import { fromUnixTime, format } from "date-fns";

export default async function getWeatherData(location = "London") {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4fda3d2831f2ad3c6e75182437f585d2`;
        const response = await fetch(url, { mode: "cors" });
        const data = await response.json();
        if (!response.ok) {
            alert(data.error.message);
            return;
        }
        const sortedData = sortWeatherData(data);
        return sortedData;
    } catch (error) {
        alert(error);
    }
}

function sortWeatherData(data) {
    return {
        weather: {
            status: data.weather[0].description,
            id: data.weather[0].id,
        },
        icon: data.weather[0].icon,
        temp: Math.round((data.main.temp - 273.15) * 10) / 10,
        temp_max: Math.round((data.main.temp_max - 273.15) * 10) / 10,
        temp_min: Math.round((data.main.temp_min - 273.15) * 10) / 10,
        feels: Math.round((data.main.feels_like - 273.15) * 10) / 10,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed * 3.6,
        chance: data.pop,
        currentTime: format(fromUnixTime(data.dt), "h:mm a"),
        sunrise: format(fromUnixTime(data.sys.sunrise), "h:mm a"),
        sunset: format(fromUnixTime(data.sys.sunset), "h:mm a"),
        location: {
            name: data.name,
            country: data.sys.country,
        },
    };
}
