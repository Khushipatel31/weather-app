const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

app.set("view engine", "ejs")
app.use(express.static("public"))
app.get("/", (req, res) => {
    const sendData = { location: "Location", temp: "Temp", desc: "Description", feel: "Feel-like", humidity: "Humidity", speed: "Speed" }
    res.render("index",{sendData})
})
app.post("/", async (req, res) => {
    let location = await req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    const result = await axios.get(url);
    const tempp = Math.floor(result.data.main.temp);
    const des = result.data.weather[0].description;
    const icon = result.data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png?`;
    res.write(`<h1>Current weather in ${location} is ${des} </h1>`);
    res.write(`<h1>The current temperature is ${tempp}degree celcius</h1>`);
    res.write(`<img src=${iconUrl}/>`)
    res.end();
})

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})