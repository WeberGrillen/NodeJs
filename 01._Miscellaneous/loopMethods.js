// .forEach .map .filter .reduce .reduce .sort .find .indexOf

// rule 1: use loop methods whenever possible
// rule 2: only use for loops in JavaScript for finger counting
// rule 3: use map over forEach if you need the data afterwareds

const numbers = [1, 2, 3, 4, 5]

// Task: double the numbers

// .map maps 1:1 to a new array

const doubledNumbers = numbers.map((number) => {
    return number * 2
})

console.log(doubledNumbers)

// Make all the difficulty levels for the balloon animals 3.0 except for Koala

const balloonAnimals = [
    { type: "Koala", difficulty: 5.0},
    { type: "Dog", difficulty: 2.5},
    { type: "Giraffe", difficulty: 1.5, isTall: true}
]

const difficultyAdjustedBalloonAnimals = balloonAnimals.map((balloonAnimal) => {
    if (balloonAnimal.type == "Koala") {
        return balloonAnimal
    } else {
        balloonAnimal.difficulty = 3
        return balloonAnimal
    }
})

const difficultyAdjustedBalloonAnimals2 = balloonAnimals.map((balloonAnimal) => {
    if (balloonAnimal.type !== "Koala") {
        balloonAnimal.difficulty = 3 
    }
        return balloonAnimal
})

// console.log(difficultyAdjustedBalloonAnimals)
// console.log(difficultyAdjustedBalloonAnimals2)

// ternary statement

// condition ? if true : if false

const difficultyAdjustedBalloonAnimalsOneLiner = balloonAnimals.map((balloonAnimals) => ({
    difficulty: balloonAnimals.type !== 'Koala' ? 3.0 : balloonAnimals.difficulty,
    ...balloonAnimals
}))

console.log(difficultyAdjustedBalloonAnimalsOneLiner)

numbers.map((element, index, originalArray) => console.log(element, index, originalArray))



