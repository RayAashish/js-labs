# JavaScript Functions
> Study Notes

---

## 1. What is a Function?

A function is a reusable block of code that performs a specific task. Functions help avoid repetition, improve readability, and organize logic into manageable units.

```js
// Define once
function greet(name) {
    return "Hello, " + name + "!";
}

// Reuse anywhere
greet("Ray");    // "Hello, Ray!"
greet("Alice");  // "Hello, Alice!"
```

---

## 2. Ways to Define a Function

JavaScript has multiple ways to create functions — each with different behavior and use cases.

### 2.1 Function Declaration

```js
function add(a, b) {
    return a + b;
}

add(2, 3);  // 5
```

- **Hoisted** — can be called before it is defined in the file
- Best for named, reusable utility functions

---

### 2.2 Function Expression

```js
const multiply = function(a, b) {
    return a * b;
};

multiply(3, 4);  // 12
```

- **Not hoisted** — must be defined before use
- Function is assigned to a variable
- Can be anonymous (no name after `function`)

---

### 2.3 Arrow Function (ES6)

```js
const square = (n) => n * n;

square(5);  // 25
```

```js
// Multi-line arrow function
const divide = (a, b) => {
    if (b === 0) return "Cannot divide by zero";
    return a / b;
};
```

- Shorter syntax
- Does **not** have its own `this` (inherits from surrounding scope)
- Cannot be used as a constructor
- Best for callbacks and short functions

---

### 2.4 Named Function Expression

```js
const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);   // can refer to itself by name
};

factorial(5);  // 120
```

- Useful for **recursion** inside the function
- The name (`fact`) is only visible inside the function body

---

### 2.5 Immediately Invoked Function Expression (IIFE)

```js
(function() {
    console.log("Runs immediately!");
})();

// Arrow IIFE
(() => {
    console.log("Arrow IIFE");
})();
```

- Runs as soon as it is defined
- Creates a **private scope** — variables inside don't pollute global scope
- Common in older code for encapsulation

---

### Comparison Table

| Type | Hoisted | Own `this` | Use Case |
|------|---------|-----------|----------|
| Function Declaration | ✅ Yes | ✅ Yes | Named, reusable functions |
| Function Expression | ❌ No | ✅ Yes | Assigned to variables |
| Arrow Function | ❌ No | ❌ No (inherits) | Callbacks, short functions |
| Named Func Expression | ❌ No | ✅ Yes | Recursion, self-reference |
| IIFE | ❌ N/A | ✅ Yes | One-time execution, encapsulation |

---

## 3. Parameters & Arguments

### Default Parameters (ES6)

```js
function greet(name = "stranger") {
    return `Hello, ${name}!`;
}

greet("Ray");   // "Hello, Ray!"
greet();        // "Hello, stranger!"
```

---

### Rest Parameters

Collects all remaining arguments into an array.

```js
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4);  // 10
```

---

### Arguments Object

Available inside regular functions (not arrow functions) — holds all passed arguments.

```js
function logAll() {
    console.log(arguments);  // array-like object
}

logAll(1, "hello", true);
// Arguments(3) [1, 'hello', true]
```

> ⚠️ Prefer **rest parameters** (`...args`) over `arguments` in modern code.

---

### Parameter vs Argument

| Term | Meaning | Example |
|------|---------|---------|
| Parameter | Variable in function definition | `function add(a, b)` — `a`, `b` are parameters |
| Argument | Actual value passed during call | `add(2, 3)` — `2`, `3` are arguments |

---

## 4. Return Values

- A function returns `undefined` by default if no `return` is used
- `return` immediately exits the function

```js
function isEven(n) {
    if (n % 2 === 0) return true;
    return false;
}

isEven(4);   // true
isEven(7);   // false
```

```js
// Returning multiple values via object
function minMax(arr) {
    return {
        min: Math.min(...arr),
        max: Math.max(...arr)
    };
}

const { min, max } = minMax([3, 1, 7, 2]);
// min = 1, max = 7
```

---

## 5. Scope

### Types of Scope

| Scope | Description | Declared With |
|-------|-------------|---------------|
| Global | Accessible everywhere | Outside any function/block |
| Function | Accessible only inside the function | `var`, `let`, `const` inside a function |
| Block | Accessible only inside `{}` | `let`, `const` inside `if`, `for`, etc. |

```js
let x = 10;              // global

function demo() {
    let y = 20;          // function scope
    if (true) {
        let z = 30;      // block scope
        console.log(x, y, z);   // 10 20 30
    }
    // console.log(z);  // ❌ ReferenceError
}
```

---

## 6. Closures

A **closure** is a function that remembers the variables from its outer scope even after that outer function has finished executing.

```js
function counter() {
    let count = 0;         // outer variable

    return function() {    // inner function (closure)
        count++;
        return count;
    };
}

const increment = counter();
increment();  // 1
increment();  // 2
increment();  // 3
```

`count` is preserved across calls because the inner function closes over it.

### Practical Use: Private Variables

```js
function createWallet(initial) {
    let balance = initial;   // private — not accessible outside

    return {
        deposit: (amt) => { balance += amt; },
        withdraw: (amt) => { balance -= amt; },
        getBalance: () => balance
    };
}

const wallet = createWallet(100);
wallet.deposit(50);
wallet.getBalance();  // 150
```

---

## 7. Higher-Order Functions

A **higher-order function** is a function that takes another function as an argument, or returns a function.

### Functions as Arguments (Callbacks)

```js
function applyTwice(fn, value) {
    return fn(fn(value));
}

applyTwice(x => x * 2, 3);  // 12  (3 → 6 → 12)
```

### Common Built-in Higher-Order Functions

```js
const nums = [1, 2, 3, 4, 5];

// map — transforms each element
nums.map(n => n * 2);           // [2, 4, 6, 8, 10]

// filter — keeps elements that pass the test
nums.filter(n => n % 2 === 0);  // [2, 4]

// reduce — accumulates into a single value
nums.reduce((acc, n) => acc + n, 0);  // 15

// forEach — iterates (no return value)
nums.forEach(n => console.log(n));

// find — returns first match
nums.find(n => n > 3);          // 4

// every / some
nums.every(n => n > 0);         // true
nums.some(n => n > 4);          // true
```

---

## 8. Function Chaining

```js
const result = [1, 2, 3, 4, 5, 6]
    .filter(n => n % 2 === 0)    // [2, 4, 6]
    .map(n => n * n)             // [4, 16, 36]
    .reduce((acc, n) => acc + n, 0);  // 56
```

---

## 9. Recursion

A function that calls itself to solve a problem by breaking it into smaller sub-problems.

```js
function factorial(n) {
    if (n <= 1) return 1;         // base case
    return n * factorial(n - 1);  // recursive case
}

factorial(5);  // 120
```

```js
// Sum of array using recursion
function sumArray(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sumArray(arr.slice(1));
}

sumArray([1, 2, 3, 4]);  // 10
```

> ⚠️ Always define a **base case** to prevent infinite recursion (stack overflow).

---

## 10. `this` in Functions

| Context | `this` value |
|---------|-------------|
| Global scope (browser) | `window` |
| Regular function | `window` (non-strict) / `undefined` (strict) |
| Method in object | The object itself |
| Arrow function | Inherited from enclosing scope |
| Constructor (`new`) | Newly created object |
| `call` / `apply` / `bind` | Explicitly set |

```js
const person = {
    name: "Ray",
    greet: function() {
        console.log("Hi, I'm " + this.name);  // this = person
    },
    greetArrow: () => {
        console.log("Hi, I'm " + this.name);  // this = window ❌
    }
};

person.greet();        // "Hi, I'm Ray"
person.greetArrow();   // "Hi, I'm undefined"
```

---

## 11. `call`, `apply`, and `bind`

These methods let you explicitly control what `this` refers to.

```js
function introduce(city, country) {
    console.log(`I'm ${this.name} from ${city}, ${country}`);
}

const user = { name: "Ray" };

// call — arguments passed individually
introduce.call(user, "Kathmandu", "Nepal");

// apply — arguments passed as array
introduce.apply(user, ["Kathmandu", "Nepal"]);

// bind — returns a NEW function with this bound
const boundIntro = introduce.bind(user, "Kathmandu");
boundIntro("Nepal");
```

| Method | Invokes Immediately | Arguments | Returns |
|--------|--------------------|-----------|-----------------------------|
| `call` | ✅ Yes | Individual | Result of function |
| `apply` | ✅ Yes | Array | Result of function |
| `bind` | ❌ No | Individual | New function (call later) |

---

## 12. Pure vs Impure Functions

### Pure Function

- Always returns the same output for the same input
- No side effects (doesn't modify external state)

```js
function add(a, b) {
    return a + b;   // pure — predictable, no side effects
}
```

### Impure Function

- May return different results or cause side effects

```js
let total = 0;

function addToTotal(n) {
    total += n;     // impure — modifies external variable
    return total;
}
```

> ✅ Prefer **pure functions** — easier to test, debug, and reason about.

---

## 13. Currying

Currying transforms a function with multiple arguments into a series of functions each taking one argument.

```js
// Normal function
function multiply(a, b) {
    return a * b;
}

// Curried version
function curriedMultiply(a) {
    return function(b) {
        return a * b;
    };
}

const double = curriedMultiply(2);
double(5);   // 10
double(10);  // 20
```

```js
// Arrow function currying (concise)
const add = a => b => a + b;
add(3)(4);  // 7
```

---

## 14. Memoization

Caching the result of expensive function calls to avoid recomputation.

```js
function memoize(fn) {
    const cache = {};
    return function(n) {
        if (cache[n] !== undefined) {
            return cache[n];   // return cached result
        }
        cache[n] = fn(n);
        return cache[n];
    };
}

const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);

fastSquare(10);  // computed
fastSquare(10);  // from cache
```

---

## 15. Generator Functions

Generator functions can **pause** and **resume** execution using `yield`.

```js
function* counter() {
    let i = 1;
    while (true) {
        yield i++;   // pauses here each time
    }
}

const gen = counter();
gen.next().value;  // 1
gen.next().value;  // 2
gen.next().value;  // 3
```

```js
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of range(1, 5)) {
    console.log(num);  // 1 2 3 4 5
}
```

---

## 16. Async Functions

### Callback Style (Old)

```js
function fetchData(callback) {
    setTimeout(() => {
        callback("data received");
    }, 1000);
}

fetchData((data) => console.log(data));
```

### Promise Style

```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("data received"), 1000);
    });
}

fetchData().then(data => console.log(data));
```

### async / await (Modern)

```js
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error("Error:", error);
    }
}

getData();
```

| Style | Readability | Error Handling | Use Case |
|-------|-------------|---------------|----------|
| Callback | Low | Nested, messy | Legacy code |
| Promise | Medium | `.catch()` | Chaining operations |
| async/await | High | `try/catch` | Modern async code |

---

## 17. Quick Reference Cheat Sheet

| Concept | Syntax |
|---------|--------|
| Declaration | `function name(params) { return val; }` |
| Expression | `const fn = function(params) { return val; };` |
| Arrow | `const fn = (params) => expression;` |
| Default param | `function fn(x = 10) {}` |
| Rest params | `function fn(...args) {}` |
| Spread in call | `fn(...array)` |
| Closure | Inner function accessing outer variable |
| HOF | Function taking/returning a function |
| Recursion | Function calling itself with a base case |
| Currying | `const fn = a => b => a + b;` |
| IIFE | `(() => { ... })();` |
| Async | `async function fn() { await promise; }` |
| Generator | `function* gen() { yield value; }` |
| bind | `fn.bind(thisArg, arg1)` |
| call | `fn.call(thisArg, arg1, arg2)` |
| apply | `fn.apply(thisArg, [arg1, arg2])` |

---

*— End of Notes —*
