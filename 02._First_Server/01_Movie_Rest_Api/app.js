
const express = require('express')

const app = express()

app.use(express.json())

class Movie {
    constructor(id, title, year) {
        this.id = id
        this.title = title
        this.year = year
    }
}


let movieList = [
    { id: 1, title: 'Garlic is as good as ten mothers', year: 1976 },
    { id: 2, title: 'Microscopic Liquid Subway to Oblivion' }
]

let nextId = 3

// get

app.get('/movies', (req, res) => {
    // res.send({movies: movieList})
    res.send({ data: movieList })
})

// get by Id

app.get('/movies/:id', (req, res) => {

    const movieId = Number(req.params.id)
    const movie = movieList.find(m => m.id === movieId)

    if (!movie) {
        res.status(404).send({ errorMesage: `No movie found by id: ${req.params.id}` })
    } else {
        res.send({ movie })
    }
})

// post

app.post('/movies', (req, res) => {

    if (!req.body) {
        return res.send(400).send({ errorMesage: 'No JSON body provided.' })
    }

    const proviededMovie = req.body
    
    proviededMovie.id = ++nextId

    movieList.push(proviededMovie)

    res.send({ data: proviededMovie })
})

// put
app.put('/movies/:id', (req, res) => {
    const proviededMovieId = Number(req.params.id)
    const {title, year} = req.body
    const movie = movieList.find(m => m.id === movieId)

    if (movie) {
        // update
        movie.title = title
        movie.year = year

        res.send({ movie })

    } else {
        res.status(404).send({ errorMesage: `No movie found by id: ${req.params.id}` });
    }
})

// patch
app.patch('/movies/:id', (req, res) => {
    const proviededMovieId = Number(req.params.id)
    const foundMovieIndex = movies.find((movie) => movie.id === proviededMovieId)
    
    if (foundMovie === -1) {
        return res.status(404).send({ errorMesage: `No movie found by id: ${req.params.id}` })
    }

    const foundMovie = movies[foundMovieIndex]
    const providedMovie = req.body

    const movieToCreate = { ...foundMovie, ...providedMovie, id: providedMovieId }
    movies[foundMovieIndex] = movieToCreate

    res.send({ data: movieToCreate })
})

// delete
app.delete('/movies/:id', (req, res) => {
    const proviededMovie = Number(req.params.id)

    const foundMovieIndex = movieList.findIndex((movie) => m.id === proviededMovie)

    if (foundMovieIndex === -1) {
        return res.status(404).send({ errorMesage: `No movie found by id: ${req.params.id}` })
    }

    movies.splice(foundMovieIndex, 1)

    res.status(204).send()
    
})


/*
    Status code
2xx: Success
3xx: Redicretion
4xx: Client Error
5xx: Server Error

*/

app.listen(8080)