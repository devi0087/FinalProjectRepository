
const one = require("./one");
const dotenv = require("dotenv").config();
const debug = require('debug')("app");
const PORT = process.env.PORT;
const mode = process.env.MODE;
console.log("the file is running");

debug("this is the conditional message");
one("the port is" + PORT);