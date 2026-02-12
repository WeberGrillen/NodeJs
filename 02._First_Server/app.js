// import express
const express = require('express');
// instantiate express
const app = express();

app.use(express.json())

// one-liner version:
// const app = require('express')();

console.log(__dirname)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/xss', (req, res) => {
    res.sendFile(__dirname + '/xss.html')
})

// create new route called snowstorms, it should respond with a warning

app.get('/snowstorms', (req, res) => {
    res.send({ data: "Snowstorm is comming"});
});

// how can we send data in a GET request?


// call back function is a function that is passed to another function
// path variable
app.get('/cars/:carModel/:year', (req, res) => { 
    console.log(req.params);
    res.send({ data: `
        your ${req.params.carModel} is very nice.
        Is it from the year ${req.params.year}?
    ` });
})

// query string / query parameters
// (syntax in browser) ?parametername=value&parametertwo=valuetwo
app.get('/bag', (req, res) => {
    res.send({ data: req.query });
})

app.post('/dinosaurs', (req, res) => {
    console.log(req.body)

    res.send(req.body)
})

// assignment: create a POST route witht the endpoint /energydrinks that adds energy drinks to an array
const energyDrinks = []

app.post('/energydrinks', (req, res) => {
    energyDrinks.push(req.body)
    console.log(energyDrinks)
    res.send(req.body)
})

app.listen(8080);