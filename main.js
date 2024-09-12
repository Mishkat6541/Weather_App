
const city_name = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const button = document.getElementById("search-btn");
const city_input = document.getElementById("city-input");

button.addEventListener("click", function() {
    const city = city_input.value.trim();  

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const encodedCity = encodeURIComponent(city);

    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?key=GH3RQ7GYCDLTA9BUS275CU8SF`;

    fetch(apiUrl, { mode: 'cors' })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            city_name.innerHTML = response.address;
            temperature.innerHTML = response.currentConditions.temp + " °C";
            description.innerHTML = response.description || "No description available";
            humidity.innerHTML = response.currentConditions.humidity + "%";
            wind_speed.innerHTML = response.currentConditions.windspeed + " m/s";
        })
        .catch(function(err) {
            alert("Error: " + err.message);
        });
});

