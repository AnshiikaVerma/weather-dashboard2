async function getWeather() {
  const city = document.getElementById("city-input").value;
  const resultDiv = document.getElementById("weather-result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `
        <div class="weather-card">
          <h2>${data.city}</h2>
          <div class="weather-info">
            <div>
              <p style="font-size:1.5rem;">🌡 ${data.temperature} °C</p>
              <p style="text-transform:capitalize;">${data.description}</p>
            </div>
            <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png">
          </div>
        </div>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching weather is  data.";
  }
}
