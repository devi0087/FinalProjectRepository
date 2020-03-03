"use strict";

// Import the Mongoose library
const mongoose = require("mongoose");

// Connect the mongoose instance to our MongoDB
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the document model for the 'cats' collection
const Cat = mongoose.model("Cat", { name: String, age: Number });

// Create a new Cat document and save it to the database
const kitty = new Cat({ name: "Callie", age: 6 });
kitty.save().then(savedKitty => console.log(`${savedKitty.name} says 'meow'`));

// Directly insert an array of Cat property objects
const newCats = [
  { name: "Fluffy", age: 2 },
  { name: "Pink Spots", age: 12 },
  { name: "Tabatha", age: 16 }
];
Cat.insertMany(newCats).then(docs => console.log(docs));

// List all of the Cats in the collection
Cat.find().then(result => console.log({ listAll: result }));

// List only the Cats with 'Spot' in the name
Cat.find({ name: /Spot/ }).then(result => console.log({ regex: result }));