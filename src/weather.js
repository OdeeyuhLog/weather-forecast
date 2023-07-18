import { fromUnixTime, format, parseISO, getDay } from "date-fns";

async function getWeatherData(location = "London") {
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
            lat: data.coord.lat,
            lon: data.coord.lon,
        },
    };
}

async function getForecastData(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await fetch(url, { mode: "cors" });
        const forecastData = await response.json();
        if (!response.ok) {
            alert(forecastData.error.message);
        }
        const newForecastData = sortForecastData(forecastData);
        return newForecastData;
    } catch (error) {
        throw new Error(error);
    }
}

function sortForecastData(data) {
    const dataArr = [];
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const weatherIcons = {
        0: "01d",
        1: "01d",
        2: "02d",
        3: "03d",
        45: "50d",
        48: "50d",
        51: "09d",
        53: "09d",
        55: "09d",
        56: "09d",
        57: "09d",
        61: "10d",
        63: "10d",
        65: "10d",
        66: "10d",
        67: "10d",
        71: "13d",
        73: "13d",
        75: "13d",
        77: "13d",
        80: "09d",
        81: "09d",
        82: "09d",
        85: "13d",
        86: "13d",
        95: "11d",
        96: "11d",
        99: "11d",
    };

    data.daily.time.forEach((day, index) => {
        const dailyObject = {
            date: format(parseISO(day), "MM/dd"),
            dayName: weekday[getDay(parseISO(day))],
            temp: {
                c:
                    Math.round(
                        ((data.daily.temperature_2m_max[index] +
                            data.daily.temperature_2m_min[index]) /
                            2) *
                            1
                    ) / 1,
                get f() {
                    return Math.round(((this.c * 9) / 5 + 32) * 1) / 1;
                },
            },
            icon: weatherIcons[data.daily.weathercode[index]],
        };
        dataArr.push(dailyObject);
    });

    return dataArr;
}

export { getWeatherData, getForecastData };
