# JavaScript Arrays
> Study Notes

---

## 1. What is an Array?

An array is an ordered, indexed collection of values. Arrays in JavaScript are dynamic — they can grow/shrink in size and hold values of any type (numbers, strings, objects, other arrays, etc.).

```js
const fruits = ["apple", "banana", "cherry"];
const mixed  = [1, "hello", true, null, { name: "Ray" }, [2, 3]];
```

- Index starts at **0**
- `fruits[0]` → `"apple"`, `fruits[2]` → `"cherry"`
- `fruits.length` → `3`

---

## 2. Creating Arrays

```js
// Array literal (preferred)
const arr = [1, 2, 3];

// Array constructor
const arr2 = new Array(3);        // [empty × 3]
const arr3 = new Array(1, 2, 3);  // [1, 2, 3]

// Array.of — creates array from arguments
Array.of(1, 2, 3);   // [1, 2, 3]

// Array.from — creates array from iterable or array-like
Array.from("hello");           // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 3 }, (_, i) => i + 1);  // [1, 2, 3]
Array.from(new Set([1, 2, 2, 3]));            // [1, 2, 3]
```

---

## 3. Accessing & Modifying Elements

```js
const arr = [10, 20, 30, 40, 50];

arr[0];       // 10  — first element
arr[4];       // 50  — last element
arr.at(-1);   // 50  — last element (ES2022, negative index)
arr.at(-2);   // 40

arr[1] = 99;  // modify element → [10, 99, 30, 40, 50]
arr.length;   // 5
```

---

## 4. Adding & Removing Elements

### At the End

```js
const arr = [1, 2, 3];

arr.push(4);       // adds to end   → [1, 2, 3, 4] — returns new length
arr.pop();         // removes end   → [1, 2, 3]    — returns removed element
```

### At the Beginning

```js
arr.unshift(0);    // adds to start  → [0, 1, 2, 3] — returns new length
arr.shift();       // removes start  → [1, 2, 3]    — returns removed element
```

### At Any Position — `splice`

```js
const arr = [1, 2, 3, 4, 5];

// splice(startIndex, deleteCount, ...itemsToInsert)
arr.splice(2, 1);          // remove 1 element at index 2 → [1, 2, 4, 5]
arr.splice(1, 0, 10, 11);  // insert 10, 11 at index 1 (delete 0) → [1, 10, 11, 2, 4, 5]
arr.splice(0, 2, 99);      // replace 2 elements from index 0 with 99
```

### Summary Table

| Method | Position | Mutates | Returns |
|--------|----------|---------|---------|
| `push(val)` | End | ✅ Yes | New length |
| `pop()` | End | ✅ Yes | Removed element |
| `unshift(val)` | Start | ✅ Yes | New length |
| `shift()` | Start | ✅ Yes | Removed element |
| `splice(i, n, ...vals)` | Any | ✅ Yes | Array of removed elements |

---

## 5. Searching & Finding

```js
const arr = [10, 20, 30, 20, 40];

// indexOf — first occurrence index (-1 if not found)
arr.indexOf(20);       // 1
arr.indexOf(99);       // -1

// lastIndexOf — last occurrence index
arr.lastIndexOf(20);   // 3

// includes — checks existence (boolean)
arr.includes(30);      // true
arr.includes(99);      // false

// find — first element that passes test
arr.find(n => n > 25);       // 30

// findIndex — index of first element that passes test
arr.findIndex(n => n > 25);  // 2

// findLast — last element that passes test (ES2023)
arr.findLast(n => n < 35);   // 30

// findLastIndex — index of last element that passes test (ES2023)
arr.findLastIndex(n => n < 35);  // 2
```

---

## 6. Iterating Over Arrays

```js
const arr = [1, 2, 3];

// for loop (classic)
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// for...of (clean, modern)
for (const val of arr) {
    console.log(val);
}

// forEach — runs a function for each element (no return value)
arr.forEach((val, index) => {
    console.log(index, val);
});

// entries — index + value pairs
for (const [i, val] of arr.entries()) {
    console.log(i, val);
}
```

> ⚠️ `forEach` cannot be stopped with `break` — use `for...of` when you need early exit.

---

## 7. Transforming Arrays

### `map` — Transform Each Element

Returns a **new array** of the same length.

```js
const nums = [1, 2, 3, 4];
nums.map(n => n * 2);        // [2, 4, 6, 8]
nums.map(n => n ** 2);       // [1, 4, 9, 16]
```

### `filter` — Keep Elements That Pass a Test

Returns a **new array** with matching elements only.

```js
const nums = [1, 2, 3, 4, 5, 6];
nums.filter(n => n % 2 === 0);   // [2, 4, 6]
nums.filter(n => n > 3);         // [4, 5, 6]
```

### `reduce` — Accumulate Into a Single Value

```js
const nums = [1, 2, 3, 4, 5];

// Sum
nums.reduce((acc, n) => acc + n, 0);          // 15

// Product
nums.reduce((acc, n) => acc * n, 1);          // 120

// Max value
nums.reduce((max, n) => n > max ? n : max, nums[0]);   // 5

// Flatten array of arrays
[[1, 2], [3, 4], [5]].reduce((acc, arr) => acc.concat(arr), []);  // [1,2,3,4,5]
```

### `flatMap` — Map Then Flatten (one level)

```js
const sentences = ["hello world", "foo bar"];
sentences.flatMap(s => s.split(" "));
// ["hello", "world", "foo", "bar"]
```

---

## 8. Sorting & Reversing

### `sort`

```js
// Default sort (converts to strings — ⚠️ unreliable for numbers)
[10, 1, 21, 2].sort();              // [1, 10, 2, 21] ❌

// Correct numeric sort
[10, 1, 21, 2].sort((a, b) => a - b);   // [1, 2, 10, 21] ✅ ascending
[10, 1, 21, 2].sort((a, b) => b - a);   // [21, 10, 2, 1] ✅ descending

// Sort strings
["banana", "apple", "cherry"].sort();   // ["apple", "banana", "cherry"]

// Sort objects by property
const people = [{ name: "Ray", age: 22 }, { name: "Alice", age: 19 }];
people.sort((a, b) => a.age - b.age);   // sorted by age ascending
```

> ⚠️ `sort` **mutates** the original array. Use `[...arr].sort(...)` to sort a copy.

### `reverse`

```js
[1, 2, 3].reverse();    // [3, 2, 1] — mutates original
```

### `toSorted` / `toReversed` (ES2023 — non-mutating)

```js
const arr = [3, 1, 2];
arr.toSorted((a, b) => a - b);   // [1, 2, 3] — new array, arr unchanged
arr.toReversed();                 // [2, 1, 3] — new array, arr unchanged
```

---

## 9. Copying & Combining

### `slice` — Extract a Portion (non-mutating)

```js
const arr = [1, 2, 3, 4, 5];

arr.slice(1, 4);   // [2, 3, 4]  (start inclusive, end exclusive)
arr.slice(2);      // [3, 4, 5]  (from index 2 to end)
arr.slice(-2);     // [4, 5]     (last 2 elements)
arr.slice();       // [1, 2, 3, 4, 5]  (shallow copy of whole array)
```

### `concat` — Combine Arrays (non-mutating)

```js
const a = [1, 2];
const b = [3, 4];

a.concat(b);         // [1, 2, 3, 4]
a.concat(b, [5, 6]); // [1, 2, 3, 4, 5, 6]
```

### Spread Operator (modern, preferred)

```js
const a = [1, 2];
const b = [3, 4];

const combined = [...a, ...b];          // [1, 2, 3, 4]
const copy     = [...a];               // shallow copy
const withMore = [...a, 10, ...b];     // [1, 2, 10, 3, 4]
```

---

## 10. Flattening Arrays

```js
const nested = [1, [2, 3], [4, [5, 6]]];

nested.flat();      // [1, 2, 3, 4, [5, 6]]  — 1 level deep (default)
nested.flat(2);     // [1, 2, 3, 4, 5, 6]    — 2 levels deep
nested.flat(Infinity);  // fully flatten any depth
```

---

## 11. Array Destructuring

```js
const [a, b, c] = [1, 2, 3];
// a=1, b=2, c=3

// Skip elements
const [first, , third] = [10, 20, 30];
// first=10, third=30

// Default values
const [x = 5, y = 7] = [1];
// x=1, y=7

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4];
// head=1, tail=[2, 3, 4]

// Swap variables
let p = 1, q = 2;
[p, q] = [q, p];
// p=2, q=1
```

---

## 12. Spread & Rest with Arrays

```js
// Spread — expand array into individual elements
const nums = [1, 2, 3];
Math.max(...nums);        // 3
console.log(...nums);     // 1 2 3

// Copy
const copy = [...nums];

// Pass array as function args
function add(a, b, c) { return a + b + c; }
add(...nums);             // 6

// Rest — collect remaining into array (in function params)
function first(a, ...rest) {
    console.log(a);     // 1
    console.log(rest);  // [2, 3, 4, 5]
}
first(1, 2, 3, 4, 5);
```

---

## 13. Checking Arrays

```js
// Is it an array?
Array.isArray([1, 2, 3]);   // true
Array.isArray("hello");     // false

// every — all elements pass the test?
[2, 4, 6].every(n => n % 2 === 0);   // true
[2, 3, 6].every(n => n % 2 === 0);   // false

// some — at least one element passes?
[1, 3, 5].some(n => n % 2 === 0);    // false
[1, 2, 5].some(n => n % 2 === 0);    // true
```

---

## 14. Converting Arrays

```js
// Array → String
[1, 2, 3].join(", ");    // "1, 2, 3"
[1, 2, 3].join("-");     // "1-2-3"
[1, 2, 3].join("");      // "123"
[1, 2, 3].toString();    // "1,2,3"

// String → Array
"hello".split("");        // ['h','e','l','l','o']
"a,b,c".split(",");       // ['a','b','c']

// Set → Array (remove duplicates)
[...new Set([1, 2, 2, 3, 3])];    // [1, 2, 3]
Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]
```

---

## 15. Common Patterns

### Remove Duplicates

```js
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];   // [1, 2, 3, 4]
```

### Flatten & Deduplicate

```js
const nested = [[1, 2], [2, 3], [3, 4]];
const result = [...new Set(nested.flat())];  // [1, 2, 3, 4]
```

### Group by Property

```js
const people = [
    { name: "Ray", role: "dev" },
    { name: "Alice", role: "design" },
    { name: "Bob", role: "dev" }
];

const grouped = people.reduce((acc, person) => {
    (acc[person.role] = acc[person.role] || []).push(person);
    return acc;
}, {});
// { dev: [...], design: [...] }
```

### Chunk Array into Batches

```js
function chunk(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

chunk([1, 2, 3, 4, 5], 2);  // [[1,2], [3,4], [5]]
```

### Shuffle Array (Fisher-Yates)

```js
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
```

### Zip Two Arrays

```js
const keys   = ["a", "b", "c"];
const values = [1, 2, 3];

const zipped = keys.map((k, i) => [k, values[i]]);
// [["a",1], ["b",2], ["c",3]]

// Or as an object
const obj = Object.fromEntries(keys.map((k, i) => [k, values[i]]));
// { a: 1, b: 2, c: 3 }
```

---

## 16. Mutating vs Non-Mutating Methods

| Method | Mutates Original? |
|--------|------------------|
| `push`, `pop` | ✅ Yes |
| `shift`, `unshift` | ✅ Yes |
| `splice` | ✅ Yes |
| `sort` | ✅ Yes |
| `reverse` | ✅ Yes |
| `fill` | ✅ Yes |
| `copyWithin` | ✅ Yes |
| `map` | ❌ No (new array) |
| `filter` | ❌ No (new array) |
| `reduce` | ❌ No (new value) |
| `slice` | ❌ No (new array) |
| `concat` | ❌ No (new array) |
| `flat`, `flatMap` | ❌ No (new array) |
| `toSorted`, `toReversed` | ❌ No (ES2023) |
| `find`, `findIndex` | ❌ No (value/index) |
| `includes`, `indexOf` | ❌ No (boolean/index) |
| `forEach` | ❌ No (undefined) |
| `join` | ❌ No (string) |

---

## 17. Quick Reference Cheat Sheet

| Task | Code |
|------|------|
| Create | `const a = [1, 2, 3]` |
| From iterable | `Array.from("abc")` → `['a','b','c']` |
| Length | `a.length` |
| Last element | `a.at(-1)` |
| Add to end | `a.push(val)` |
| Remove from end | `a.pop()` |
| Add to start | `a.unshift(val)` |
| Remove from start | `a.shift()` |
| Insert/remove anywhere | `a.splice(i, deleteCount, ...items)` |
| Extract portion | `a.slice(start, end)` |
| Find element | `a.find(fn)` |
| Find index | `a.findIndex(fn)` |
| Check existence | `a.includes(val)` |
| Transform all | `a.map(fn)` |
| Filter | `a.filter(fn)` |
| Accumulate | `a.reduce((acc, val) => ..., init)` |
| Sort numbers | `a.sort((a, b) => a - b)` |
| Reverse | `a.reverse()` |
| Flatten | `a.flat(depth)` |
| Combine | `[...a, ...b]` or `a.concat(b)` |
| Copy | `[...a]` or `a.slice()` |
| Remove duplicates | `[...new Set(a)]` |
| Array → String | `a.join(", ")` |
| String → Array | `str.split(",")` |
| Is Array? | `Array.isArray(a)` |
| All pass? | `a.every(fn)` |
| Any pass? | `a.some(fn)` |

---

*— End of Notes —*
