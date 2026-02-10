// import express
const express = require('express');
// instantiate express
const app = express();


// one-liner version:
// const app = require('express')();


app.get('/', (req, res) => {
    res.send({ data: "Welcome to the first server!"});
});


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



app.listen(8080);