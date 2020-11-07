// To import express.js
const express = require("express");
// For https requwst
const https = require("https");
// bodyparsing
const bodyParser = require("body-parser")
// Assigning app const to use express.js
const app = express();
// Syntax to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// To send index.html upon request
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
// console.log(req.body.cityName);
const query = req.body.cityName
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=7413577edcf4767252de5df761d5175c"
https.get(url, function(response)
{
// console.log(response.statusCode);
// To convert into JSON
response.on("data",function(data){
  const weatherData = JSON.parse(data)
  console.log(weatherData);
  // console.log(data);
  const temp = weatherData.main.temp;
  const icon = weatherData.weather[0].icon;
  const cond = weatherData.weather[0].description;
  const ic = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
  // console.log(temp);
  // console.log(ic);
  res.write("<h1>The Tempreture is " + temp + "</h1>");
  res.write("<h1>Weather Condition is " + cond + "</h1>")
  res.write("<img src =" +ic+ ">" );
  res.send();
})
})
})
// To Listen a port
app.listen(3000,function(){
  // console.log("Server is running on port 3000");
})
