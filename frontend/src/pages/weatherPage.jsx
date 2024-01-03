import React, { useState } from 'react';
import axios from 'axios';
import '../styles/weatherStyles.css'
const baseURL = 'http://localhost:5000/api/weather/getWeather';

const WeatherPage = () => {
    const [cities, setCities] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setCities(e.target.value);
    };

    const fetchWeatherData = async () => {
        try {
            const response = await axios.post(baseURL, { cities: cities.split(',') });
            console.log(response.data)
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching weather data');
        }
    };

    const handleClear =  () => {
        setWeatherData([])
        setCities('')
    }

    return (
        <div className="weather-container">
            <h1>Find Weather</h1>
            <div className="input-section">
                <label htmlFor="cities">Enter Cities (comma-separated): </label>
                <input
                    type="text"
                    id="cities"
                    value={cities}
                    onChange={handleInputChange}
                    className='input-field'
                />
                <button className='fetch-button' onClick={fetchWeatherData}>Fetch Weather</button>
                <button  classNName='clear-button' onClick={handleClear}>Clear</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="weather-cards">
                {weatherData.map((weather, index) => (
                    <div key={index} className="weather-card">
                        <h2>{weather.location.name}</h2>
                        <p>Temperature: {weather.current.temperature} °C</p>
                        <p>Feels Like: {weather.current.feelslike} °C</p>
                        <p>Weather: {weather.current.weather_descriptions.join(', ')}</p>
                        <p>Wind: {weather.current.wind_speed} km/h</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherPage;
