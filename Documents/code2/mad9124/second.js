function hello(){
    console.log("hello");

}
const foo = function() {
    console.log('there is add 2and 4');
    let a = 2;
    let b = 4;
    let c = a+b;
    console.log(c);
}
const bar = function() {
    console.log('i love you lalit');
}
const baz = function() {
    console.log('this is private function');
}
const mad = function() {
console.log('she is mad');
}

module.exports.h = hello;
module.exports.foo = foo;
module.exports.bar = bar;
module.exports.mad = mad;