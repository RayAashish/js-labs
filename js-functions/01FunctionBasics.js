/* 1. What is a Function?
A function is simply a reusable block of code. */

function sayHello(){
    console.log("Hello, World!");
}

sayHello();

/* 
2. Parameters and Arguments
-> Parameters are variables in function definition.
-> Arguments are values passed during function call.
*/

function greet(name){
    console.log(`Hello, ${name}`);
}

greet("Aashish");

/*
3. Return Keyword
-> Without return, a function gives back undefined. 
*/

function add(x, y){
    return x + y;
}
console.log(add(23, 18));

/*
4. Function Declaration
-> Functions can be called before the declaration because of hoisting behaviours
*/

console.log(square(4));
function square(x){
    return x * x;
}

/*
5. Function Expression
-> Function stored inside a variable.

Imp :: This type of function can't be used before the declaration like the traditional functions.
*/

const area = function(l, b) {
    return l * b;
}
console.log(area(10, 7.4));


/*
6. Arrow Function
-> Introduced in ES6 & it has become very popular in React.
*/

const sum = (a, b) => a + b;
console.log(sum(4.7, 9.8));
