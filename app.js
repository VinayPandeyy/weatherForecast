//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req , res){
res.sendFile(__dirname + "/index.html");
});


app.post("/" , function(req , res){
// var city = req.body.cityName;
//   console.log(city);
  const query = req.body.cityName;
  const apiKey ="8c8aa098fa371274203e62259c6b1749";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey+"&units="+unit+" " ;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const dis = weatherData.weather[0].description;
      const icon =weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(dis);
      console.log(temp);
      // res.write("<h3> The weather discription is :"+dis+" </h3> <img src="+imageURL+"> ");
      // res.write("<h2> The  temprature in "+ query+" is " +temp+" &#8451</h2>");

      res.send("<h3> The weather discription is :"+dis+" </h3> <img src="+imageURL+"> <h2> The  temprature in "+ query+" is " +temp+" &#8451</h2> ");
    });
   });
});


app.listen(3000,function(){
  console.log("server started on port 3000");
});
