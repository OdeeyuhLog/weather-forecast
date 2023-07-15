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
        temp: {
            c: Math.round((data.main.temp - 273.15) * 10) / 10,
            f: Math.round((((data.main.temp - 273.15) * 9) / 5 + 32) * 10) / 10,
        },
        temp_max: {
            c: Math.round((data.main.temp_max - 273.15) * 10) / 10,
            f:
                Math.round(
                    (((data.main.temp_max - 273.15) * 9) / 5 + 32) * 10
                ) / 10,
        },
        temp_min: {
            c: Math.round((data.main.temp_min - 273.15) * 10) / 10,
            f:
                Math.round(
                    (((data.main.temp_min - 273.15) * 9) / 5 + 32) * 10
                ) / 10,
        },
        feels: {
            c: Math.round((data.main.feels_like - 273.15) * 10) / 10,
            f:
                Math.round(
                    (((data.main.feels_like - 273.15) * 9) / 5 + 32) * 10
                ) / 10,
        },
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed * 3.6 * 10) / 10,
        chance: data.pop,
        date: format(fromUnixTime(data.dt), "MM/dd/yyyy"),
        currentTime: format(fromUnixTime(data.dt), "h:mm a"),
        sunrise: format(fromUnixTime(data.sys.sunrise), "h:mm a"),
        sunset: format(fromUnixTime(data.sys.sunset), "h:mm a"),
        location: {
            name: data.name,
            country: data.sys.country,
        },
    };
}
