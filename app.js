const apiKey = 'b005fe3c5f0289ef25afa3998711b9dc'; // Your API Key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('getWeather').addEventListener('click', fetchWeatherData);

function fetchWeatherData() {
    const city = document.getElementById('city').value.trim();

    if (city === '') {
        document.getElementById('errorMessage').innerText = 'Please enter a city name.';
        return;
    }

    document.getElementById('errorMessage').innerText = ''; // Reset error message

    const url = `${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);  // Only call this once data is fetched successfully
            } else {
                document.getElementById('errorMessage').innerText = 'City not found, please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('errorMessage').innerText = 'Failed to fetch data, please try again later.';
        });
}

function displayWeatherData(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    // Displaying weather info
    document.getElementById('temperature').innerText = `Temperature: ${temp}°C`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${windSpeed} m/s`;
    document.getElementById('weatherDescription').innerText = `Condition: ${weatherDescription}`;

    // Show the weather info section
    document.getElementById('weatherInfo').style.display = 'block';

    // Changing the background and icon based on weather condition
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
    document.getElementById('weatherIcon').src = iconUrl;

}
