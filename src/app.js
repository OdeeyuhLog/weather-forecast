import { getWeatherData, getForecastData } from "./weather";
import { populateForecasts, populateSections } from "./contentLoader";
import svgFeels from "./assets/utility/thermometer.svg";
import svgSunrise from "./assets/utility/sunrise.svg";
import svgSunset from "./assets/utility/sunset.svg";
import svgHumid from "./assets/utility/raindrop.svg";
import svgWind from "./assets/utility/wind.svg";
import svgUmbrella from "./assets/utility/umbrella.svg";
import svgDown from "./assets/utility/pressure-low.svg";
import svgUp from "./assets/utility/pressure-high.svg";
import loadingSvg from "./assets/utility/wind-toy.svg";
import "./style.scss";

let currentData = {};
let forecastData = [];
let currentLocation = "London";

function renderHomePage() {
    const loadingScreen = document.createElement("div");
    const loadingImg = document.createElement("img");

    loadingImg.src = loadingSvg;

    loadingScreen.appendChild(loadingImg);

    const container = document.createElement("div");
    container.id = "container";

    const nav = document.createElement("nav");

    const heading = document.createElement("h2");
    heading.textContent = "Weather App";

    const form = document.createElement("form");
    form.action = "";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter location...";

    const button = document.createElement("button");
    button.textContent = "Search";

    const updateTempBtn = document.createElement("button");
    updateTempBtn.textContent = "Switch to F°";

    form.appendChild(input);
    form.appendChild(button);

    nav.appendChild(heading);
    nav.appendChild(form);
    nav.appendChild(updateTempBtn);

    const main = document.createElement("div");
    main.id = "main";

    const weatherDisplay = document.createElement("section");
    weatherDisplay.id = "weather-display";

    const locationDisplay = document.createElement("p");
    locationDisplay.id = "location-display";

    const statusDisplay = document.createElement("h2");
    statusDisplay.id = "status-display";

    const weatherIcon = document.createElement("div");
    weatherIcon.src = "";
    weatherIcon.alt = "";
    weatherIcon.id = "icon-display";

    const tempContainer = document.createElement("div");
    tempContainer.id = "temp-container";

    const tempDisplay = document.createElement("h2");
    tempDisplay.id = "temp-display";

    const minTempDiv = document.createElement("div");

    const arrowDown = document.createElement("img");
    arrowDown.src = svgDown;

    const minTemp = document.createElement("p");
    minTemp.id = "min_temp";

    minTempDiv.appendChild(arrowDown);
    minTempDiv.appendChild(minTemp);

    const maxTempDiv = document.createElement("div");

    const arrowUp = document.createElement("img");
    arrowUp.src = svgUp;

    const maxTemp = document.createElement("p");
    maxTemp.id = "max_temp";

    maxTempDiv.appendChild(arrowUp);
    maxTempDiv.appendChild(maxTemp);

    tempContainer.appendChild(tempDisplay);
    tempContainer.appendChild(minTempDiv);
    tempContainer.appendChild(maxTempDiv);

    const timeDisplay = document.createElement("p");
    timeDisplay.id = "time-display";

    weatherDisplay.appendChild(locationDisplay);
    weatherDisplay.appendChild(statusDisplay);
    weatherDisplay.appendChild(weatherIcon);
    weatherDisplay.appendChild(tempContainer);
    weatherDisplay.appendChild(timeDisplay);

    const detailsDisplay = document.createElement("section");
    detailsDisplay.id = "details-display";

    const detailCards = [
        { imgSrc: svgFeels, id: "feels", label: "Feels Like" },
        { imgSrc: svgSunrise, id: "sunrise", label: "Sunrise" },
        { imgSrc: svgSunset, id: "sunset", label: "Sunset" },
        { imgSrc: svgHumid, id: "humidity", label: "Humidity" },
        { imgSrc: svgWind, id: "wind-speed", label: "Wind Speed" },
        { imgSrc: svgUmbrella, id: "rain-chance", label: "Rain Chance" },
    ];

    detailCards.forEach((cardData) => {
        const detailCard = document.createElement("div");
        detailCard.classList.add("detail-card");

        const cardImg = new Image();
        cardImg.src = cardData.imgSrc;
        cardImg.alt = "";

        const textContainer = document.createElement("div");

        const cardHeading = document.createElement("h2");
        cardHeading.id = cardData.id;

        const cardLabel = document.createElement("p");
        cardLabel.textContent = cardData.label;

        textContainer.appendChild(cardHeading);
        textContainer.appendChild(cardLabel);

        detailCard.appendChild(cardImg);
        detailCard.appendChild(textContainer);

        detailsDisplay.appendChild(detailCard);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            updateTempBtn.textContent = "Switch to F°";
            currentLocation = input.value;
            currentData = await getWeatherData(currentLocation);
            input.value = "";
            forecastData = await getForecastData(
                currentData.location.lat,
                currentData.location.lon
            );
            populateSections(currentData);
            populateForecasts(forecastData);
        } catch (error) {
            alert(error);
        }
    });

    updateTempBtn.addEventListener("click", async () => {
        if (updateTempBtn.textContent.includes("F")) {
            updateTempBtn.textContent = "Switch to C°";
            populateSections(currentData, "F");
            populateForecasts(forecastData, "F");
        } else {
            updateTempBtn.textContent = "Switch to F°";
            populateSections(currentData, "C");
            populateForecasts(forecastData);
        }
    });

    const forecastDisplay = document.createElement("section");
    forecastDisplay.id = "forecast-display";

    main.appendChild(weatherDisplay);
    main.appendChild(detailsDisplay);
    main.appendChild(forecastDisplay);

    container.appendChild(nav);
    container.appendChild(main);

    // Append the container element to the document body or any desired parent element
    document.body.appendChild(container);
    initPageContent();
}

async function initPageContent() {
    currentData = await getWeatherData();
    forecastData = await getForecastData(
        currentData.location.lat,
        currentData.location.lon
    );
    populateSections(currentData);
    populateForecasts(forecastData);
}

export default function startApp() {
    return {
        init() {
            renderHomePage();
        },
    };
}
