// Javascript is single-thread, everything run in the main thread

// Examples of blocking operations
// Network, database, file handling, hardware, user input


// Solutions 1: Callback functions

// Problem: Callback Hell, Pyramid of doom

// Solutions 2: Promises

// pending, fulfilled
            // resolved, rejected

// Problem: Nested promises

// Solution 3: Async / Await (just syntactic sugar, uses promises under the hood)


new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            throw "On no!"
            resolve("Everthing went well");
        } catch(error) {
            reject(error)
        }
    }, 1);
    

})
.then(( successMessage ) => console.log(successMessage))
.catch(( errorMessage ) => console.log(errorMessage));


function myPromise() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                throw new Error("Something bad!")
                resolve("Something Good!")
            } catch (error) {
                reject(error)
            }
        }, 3000)        
    });
}

// myPromise()
// .then((successMessage) => console.log(successMessage))
// .catch((errorMessage) => console.log(errorMessage));

try {
    const successMessage = await myPromise();
    console.log(successMessage);
} catch (errorMessage) {
    console.log(errorMessage);
}



