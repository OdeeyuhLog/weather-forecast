import getWeatherData from "./weather";
import populateSections from "./contentLoader";

function renderHomePage() {
    let currentLocation = "London";
    const container = document.createElement("div");
    container.id = "container";

    const nav = document.createElement("nav");

    const heading = document.createElement("h2");
    heading.textContent = "Weather App";

    const form = document.createElement("form");
    form.action = "";

    const input = document.createElement("input");
    input.type = "text";

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

    const weatherIcon = document.createElement("img");
    weatherIcon.src = "";
    weatherIcon.alt = "";
    weatherIcon.id = "icon-display";

    const tempContainer = document.createElement("div");

    const tempDisplay = document.createElement("h2");
    tempDisplay.id = "temp-display";

    const minTemp = document.createElement("p");
    minTemp.id = "min_temp";

    const maxTemp = document.createElement("p");
    maxTemp.id = "max_temp";

    tempContainer.appendChild(tempDisplay);
    tempContainer.appendChild(minTemp);
    tempContainer.appendChild(maxTemp);

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
        { imgSrc: "", id: "feels", label: "Feels Like" },
        { imgSrc: "", id: "sunrise", label: "Sunrise" },
        { imgSrc: "", id: "sunset", label: "Sunset" },
        { imgSrc: "", id: "humidity", label: "Humidity" },
        { imgSrc: "", id: "wind-speed", label: "Wind Speed" },
    ];

    detailCards.forEach((cardData) => {
        const detailCard = document.createElement("div");
        detailCard.classList.add("detail-card");

        const cardImg = document.createElement("img");
        cardImg.src = cardData.imgSrc;
        cardImg.alt = "";

        const cardHeading = document.createElement("h2");
        cardHeading.id = cardData.id;

        const cardLabel = document.createElement("p");
        cardLabel.textContent = cardData.label;

        detailCard.appendChild(cardImg);
        detailCard.appendChild(cardHeading);
        detailCard.appendChild(cardLabel);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                updateTempBtn.textContent = "Switch to F°";
                currentLocation = input.value;
                const data = await getWeatherData(input.value);
                input.value = "";
                populateSections(data);
            } catch (error) {
                console.log(error);
            }
        });

        updateTempBtn.addEventListener("click", async () => {
            const data = await getWeatherData(currentLocation);

            if (updateTempBtn.textContent.includes("F")) {
                updateTempBtn.textContent = "Switch to C°";
                populateSections(data, "F");
            } else {
                updateTempBtn.textContent = "Switch to F°";
                populateSections(data, "C");
            }
        });

        detailsDisplay.appendChild(detailCard);
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
    const initData = await getWeatherData();
    populateSections(initData);
}

export default function startApp() {
    return {
        init() {
            renderHomePage();
        },
    };
}
