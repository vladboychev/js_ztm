const power = function(x,y) {return Math.pow(x,y)};

function multiply(x,y) {return x*y;};
const add = function(x,y) {return x+y;};
function divide(x,y) {return x/y;};
const subtract = function(x,y) {return x-y;};

const operations = [add, subtract, divide, multiply, power];

function operate(x,y) {
    const results = [];
    for (let func of operations) {
        results.push(func(x,y))
    }
    return results;
}

const operator = {
    'multiply': multiply,
    'divide': divide,
    'add': add,
    'subtract': subtract,
    'power': power
}

const dotLoad = function() {console.log("...");}
const starLoad = function() {console.log("***");}

function repeatNTimes(action, times) {
    for (let i = 1; i < times + 1; i++) {
        action();
        console.log("Action " + i + " is done!");
    }
}

function runRandom(f1,f2) {
    let num = Math.random();
    let randomFunc = num > 0.5 ? f1 : f2;
    return randomFunc();
}

function multiplyBy(num) {
    return function(x) {
        return x*num;
    }
}

function checkBetween(x,y) {
    return function(num) {
        return x<=num<=y;
    }
}

const btn = document.querySelector("button");
btn.addEventListener("click", function() {alert("WELCOME HOME!");});