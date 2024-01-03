const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

const weather_api_base_url = "http://api.weatherstack.com/current";

router.post("/getWeather", async (req, res) => {
    const { cities } = req.body;
    const access_key = process.env.ACCESS_KEY;
    console.log(Array.isArray(cities));
    console.log(cities);
    if (!cities || !Array.isArray(cities)) {
        return res.status(400).json({ err: "cities is not an array" });
    }
    try {
        console.log(cities);
        const weatherPromises = cities.map(city => {
            return axios.get(`${weather_api_base_url}?access_key=${access_key}&query=${city}`);
        }
        );
        
        const weatherData = await Promise.all(weatherPromises);
        const weatherResults = weatherData.map(weather => weather.data);
        console.log(weatherResults);
        res.json(weatherResults);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }

});


module.exports = router;
