const express = require('express')
const app = express()


console.log(new Date()); // UTC date + time

console.log(Date()) // Local Time

console.log(Date.now()) // Unix Time (Miliseconds since Jan. 1st 1970)

// task create a route that returns the month



const months = ["January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
]


app.get('/months/v1', (req, res) => {

    const currentMonth = new Date().getMonth()

    res.send({ data: months[currentMonth] })
})

app.get('/months/v2', (req, res) => {

    const currentMonth = new Date().toLocaleString('da-dk', { month: 'long' })

    res.send({ data: currentMonth })
})

const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

app.get('/days/v1', (req, res) => {
    
    res.send({ data: days[new Date().getDay()] })
})

app.get('/days/v2', (req, res) => {

    const currentDay = new Date().toLocaleString('da-dk', { weekday: "long"})
    
    res.send({ data: currentDay })
})

/*
    falsy values:
    false, undefined, null, NaN, "" (empty strings)
*/

app.listen(8080, (error) => {
    if (error) {
        console.log("Error starting the server")
        return
    }

    console.log("Server is running on port", 8080)
})