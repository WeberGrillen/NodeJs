
const express = require('express')

const app = express()

class Movie {
    constructor(id, title, year) {
        this.id = id
        this.title = title
        this.year = year
    }
}

const movieList = [
     new Movie(1, "Ternet Ninja", 2018),
     new Movie(2, "The Shining", 1980 ),
     new Movie (3, "Far til Fire", 2008),
     new Movie (4, "Cars", 2006),
     new Movie (5, "Frozen", 2013)]

app.get('/movies', (req, res) => {
    // res.send({movies: movieList})
    res.send({ data: movieList })
})

app.get('/movies/:id', (req, res) => {

    const id = Number(req.params.id)
    const movie = movieList.find(m => m.id === id)

    if (!movie) {
        res.status(404).send({ errorMesage: `No movie found by id: ${req.params.id}` })
    } else {
        res.send({ movie })
    }
})


/*
    Status code
2xx: Success
3xx: Redicretion
4xx: Client Error
5xx: Server Error

*/

app.listen(8080)