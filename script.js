const searchBtn = document.querySelector("#searchBtn");
const API_KEY = "6a29e7b81fe7c99654d5ca1c53898ca1";

// showing data in these fields
let cityName = document.querySelector("#cityName");
let currentDate = document.querySelector("#dateCurrent");
let weatherIconCode = document.querySelector("#weatherLogo")
let weatherStatus = document.querySelector("#weatherStatus");
let centiGrade = document.querySelector("#centiGrade");

// main 
let temp = document.getElementById("temp");
let feelsLike = document.getElementById("feels_like");
let tempMin = document.getElementById("temp_min");
let tempMax = document.getElementById("temp_max");
// let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let seaLevel = document.getElementById("sea_level");
let grndLevel = document.getElementById("grnd_level");
let mainTbl = document.querySelector("#mainTbl");

// alert 
const notifications = document.querySelector(".notifications-container");
const alertMsg = document.querySelector(".sec-notifications-container");
const removeAlertBtn = document.querySelector(".success-button-secondary");

const executeApp = async () => {
    const inputValue = document.querySelector("#inputValue");
    if (inputValue.value != "") {
        const blobData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${API_KEY}&units=metric`);
        const readyData = await blobData.json();
        if (readyData.cod === "404") { return notFoundAlert(inputValue) };
        showingWeatherStmnt(readyData)
    }
};

searchBtn.addEventListener("click", executeApp);

const showingWeatherStmnt = (data) => {
    notifications.style.display = "none";
    cityName.innerHTML = data.name; // 1
    currentDate.innerHTML = new Date().toLocaleString().slice(0, 10) // 2
    weatherIconCode.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // 3
    weatherIconCode.style.opacity = "1";
    weatherStatus.innerHTML = data.weather[0].main; // 4
    centiGrade.innerHTML = Number(data.main.temp.toString().slice(0, 2)) + ' &deg;C'; // 5
    mainTbl.style.opacity = "1";
    temp.innerHTML = data.main.temp + " °C";
    feelsLike.innerHTML = data.main.feels_like + " °C";
    tempMin.innerHTML = data.main.temp_min + " °C";
    tempMax.innerHTML = data.main.temp_max + " °C";
    // pressure.innerHTML = data.main.pressure + " hPa";
    humidity.innerHTML = data.main.humidity + " %";
    seaLevel.innerHTML = data.main.sea_level + " hPa";
    grndLevel.innerHTML = data.main.grnd_level + " hPa";
}

const notFoundAlert = (val) => {
    val.value = "";
    // removeAllContent();
    alertMsg.style.top = "50%";
    setTimeout(() => {
        notifications.style.display = "none";
    }, 150);
}

removeAlertBtn.addEventListener("click", () => alertMsg.style.top = "-150%");

// const removeAllContent = () => {
//     console.log("remove All content code is working");
//     cityName.value = "";
//     currentDate.value = "";
//     weatherIconCode.value = "";
//     weatherStatus.value = "";
//     centiGrade.value = "";
//     temp.value = "";
//     feelsLike.value = "";
//     tempMin.value = "";
//     tempMax.value = "";
//     pressure.value = "";
//     humidity.value = "";
//     seaLevel.value = "";
//     grndLevel.value = "";
//     mainTbl.value = "";
// }