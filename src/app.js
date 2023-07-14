import getWeatherData from "./weather";
import setContent from "./contentLoader";

function renderHomePage() {
    const container = document.createElement("div");
    container.id = "container";

    const header = document.createElement("header");

    const logoImg = document.createElement("img");
    logoImg.src = "";
    logoImg.alt = "";

    const form = document.createElement("form");
    form.action = "";

    const input = document.createElement("input");
    input.type = "text";

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Enter";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const data = await getWeatherData(input.value);
            input.value = "";
            setContent(data);
        } catch (error) {
            console.log(error);
        }
    });

    form.appendChild(input);
    form.appendChild(submitButton);

    header.appendChild(logoImg);
    header.appendChild(form);

    const main = document.createElement("main");

    const section1 = document.createElement("section");

    const tempHeading = document.createElement("h2");
    tempHeading.textContent = "Temp";

    const detailsSection = document.createElement("section");
    detailsSection.textContent = "Details";

    section1.appendChild(tempHeading);
    section1.appendChild(detailsSection);

    const section2 = document.createElement("section");

    const div1 = document.createElement("div");
    div1.textContent = "Today";

    const div2 = document.createElement("div");
    div2.textContent = "Tomorrow";

    const div3 = document.createElement("div");
    div3.textContent = "The day after Tomorrow";

    section2.appendChild(div1);
    section2.appendChild(div2);
    section2.appendChild(div3);

    main.appendChild(section1);
    main.appendChild(section2);

    const footer = document.createElement("footer");

    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    // Append the container element to the document body or any desired parent element
    document.body.appendChild(container);
}

export default function startApp() {
    return {
        init() {
            renderHomePage();
        },
    };
}
