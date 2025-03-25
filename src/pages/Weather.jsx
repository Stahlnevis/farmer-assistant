import React, { useState } from "react";
import axios from "axios";
import "../styles/Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const apiKey = "7d46646f1d54203586d2eb372bbfb1f5";
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      setError("City not found. Please enter a valid city.");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
