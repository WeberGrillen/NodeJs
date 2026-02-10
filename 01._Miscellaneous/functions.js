
// hoisting

console.log(getRandomInt(4,8));



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}


const getRandomIntAnonymousFunction = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomIntArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

// javaScript: functions as first-class citizens

                            // string, function reference
                            // callback function
function genericActionPerformer(name, action) {
    return action(name);
}


function eatingAction(name) {
    return `${name} is eating`;
}

console.log(genericActionPerformer("Valdemar", eatingAction));
console.log(genericActionPerformer("Gustav", eatingAction));


// task, run, Sidi
// decleare an anonymos rfunction called runningAction
// make it return `Sidi is running``
// console.log it

const runningAction = function (name) {
    return `${name} is running`;
}

console.log(genericActionPerformer("Sidi", runningAction));

// task: extra challange
// In a single line below write 
// Kristian is laughing

console.log(genericActionPerformer('kristian', (name) => `${name} is laughing`))

