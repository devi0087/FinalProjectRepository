const fs = require("fs");
const path = require("path");
const http = require("http");
const  fetch = require("node-fetch");
const sec = require("./second");
sec.h();
sec.foo();
sec.bar();
sec.mad();


// console.log(process.env);

//  console.log(process.platform, process.pid );
// console.log(__dirname, __filename);
fs.readFile('input.txt', function (err,data) {
    if (err) {
        return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString()); 
    
});   