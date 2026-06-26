function op(a, b, callback){
    return callback(a, b);
}

const result = op(2, 8, (x, y) => Math.pow(x, y));
console.log(result);
