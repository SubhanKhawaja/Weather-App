const apiKey = "5a1d4bedb260acb9f323851ad6710b4c"

const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formEle.addEventListener("submit", (e) =>{
    e.preventDefault()
    // console.log(cityNameEle.value)
    const cityValue = cityNameEle.value

    getWeatherData(cityValue)
})
// async function getWeatherData(cityValue) {
//     try {
//         const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
//         if (!response.ok) {
//             throw new Error("Network response is not ok!");
//         }

//         const data = await response.json();
//         const temperature = Math.floor(data.main.temp);
//         const description = data.weather[0].description;
//         const icon = data.weather[0].icon;
//         const feels_like = Math.floor(data.main.feels_like);
//         const humidity = data.main.humidity;
//         const wind_speed = data.wind.speed;

//         // Send data to PHP script using FormData
//         const formData = new FormData();
//         formData.append('city_name', cityValue);
//         formData.append('temperature', temperature);
//         formData.append('description', description);
//         formData.append('feels_like', feels_like);
//         formData.append('humidity', humidity);
//         formData.append('wind_speed', wind_speed);
//         formData.append('icon', icon);

//         const result = await fetch('save_weather.php', {
//             method: 'POST',
//             body: formData
//         });
//         const text = await result.text();
//         console.log(text);  // Log the response from PHP
//     } catch (err) {
//         console.error("Error: ", err);
//     }
// }
// sendWeatherData('New York', 25.3, 'clear sky', 24.5, 60, 5.5, '01d');



 async function getWeatherData(cityValue){
    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response is not ok!")
        }

        const data = await response.json()
        //  console.log(data);

        const temprature = Math.floor(data.main.temp) 
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
        weatherDataEle.querySelector(".desc").textContent = `${description}`
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
        weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
            return `<div>${detail}</div>`
        }).join("")
    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!"
    }

}

