const mongoose = require("mongoose");
const gift = require("./gift");
const sanitizeMongo = require("express-mongo-sanitize");
const schema = new mongoose.Schema({
    name: {type: String, minlength: 4, maxlength: 64, required: true},
    price: {type: Number(integer in cents), minlength: 100, default: 1000},
    imageUrl: {type: String, minlength: 1024, required: false},
    store: {
    name: {type: String, maxlength: 254},
    productUrl: {type: String, maxlength: 1024},
    }
});
const Model = mongoose.model("gift", schema);

module.exports = Model;