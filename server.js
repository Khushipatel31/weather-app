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
    windSpeed: '',
    forecasts:[],
    minTemps:[],
    maxTemps:[]
};

app.get("/", (req, res) => {
    res.render("index", weatherData);
});
const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getUTCDay()];
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

app.post("/", async (req, res) => {
    const location = req.body.city;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.FORECASTAPIKEY}&q=${req.body.city}&days=7&aqi=no&alerts=no`;
    try {
        const result = await axios.get(url);
        console.log(result.data)
        if (result.status === 200) {
            const tempp = result.data.current.temp_c;
            const des = result.data.current.condition.text;
            const iconUrl = result.data.current.condition.icon;
            const city = result.data.location.name;
            const humidity = result.data.current.humidity;
            const windSpeed = result.data.current.wind_kph;
            const forecastData=result.data.forecast.forecastday;
            const forecasts = forecastData.map(data => ({
                dayOfWeek: getDayOfWeek(data.date),
                icon: data.day.condition.icon,
                formattedDate: formatDate(data.date)
            }));
            const minTemps = forecastData.map(data => data.day.mintemp_c);
            const maxTemps = forecastData.map(data => data.day.maxtemp_c);
            weatherData = { city, success: true, tempp, des, iconUrl, humidity, windSpeed,forecasts,minTemps,maxTemps };
        } else {
            weatherData = { city: location, success: false, tempp: '', des: '', iconUrl: '', humidity: '', windSpeed: '',forecasts:[],minTemps:[],maxTemps:[] };
        }
    } catch (error) {
        console.log(error)
        weatherData = { city: location, success: false, tempp: '', des: '', iconUrl: '', humidity: '', windSpeed: '' ,forecasts:[],minTemps:[],maxTemps:[]};
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
