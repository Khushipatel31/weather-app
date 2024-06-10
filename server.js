const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let weatherData = {
    city: '',
    success: null,
    tempp: '',
    des: '',
    iconUrl: '',
    humidity: '',
    windSpeed: ''
};

app.get("/", (req, res) => {
    res.render("index", weatherData);
});

app.post("/", async (req, res) => {
    const location = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    try {
        const result = await axios.get(url);
        if (result.data.cod === 200) {
            const tempp = Math.floor(result.data.main.temp);
            const des = result.data.weather[0].description;
            const icon = result.data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const city = result.data.name;
            const humidity = result.data.main.humidity;
            const windSpeed = result.data.wind.speed;
            weatherData = { city, success: true, tempp, des, iconUrl, humidity, windSpeed };
        } else {
            weatherData = { city: location, success: false, tempp: '', des: '', iconUrl: '', humidity: '', windSpeed: '' };
        }
    } catch (error) {
        weatherData = { city: location, success: false, tempp: '', des: '', iconUrl: '', humidity: '', windSpeed: '' };
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
