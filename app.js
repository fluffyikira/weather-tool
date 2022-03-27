
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {
    const query = req.body.cityName;
    const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + query + '&APPID=7f667908d523720138dbfe7eace9f1c0'
    https.get(url,function(response) {
        
        response.on("data", function(d) {
            
            chennaiData = JSON.parse(d);
            const icon = chennaiData.weather[0].icon;
            const weatherImage = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
            
            res.write("<img src="+weatherImage+">");
            res.write('<h1>The temp in ' + query +' is : '+chennaiData.main.temp+' degree celsius</h1>');
            res.write('<h2>The weather is : '+chennaiData.weather[0].description);
            
            res.send();
        })
    })
})

app.listen(3000, function(){
    console.log("3000 is running");
})

