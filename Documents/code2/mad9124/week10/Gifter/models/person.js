const mongoose = require("mongoose");
const person = require("./person");
const sanitizeMongo = require("express-mongo-sanitize");
const schema = new mongoose.Schema({
    name: {type: String, maxlength: 254, required: true},
    birthDate: {type: Date, required: true},
    owner: {type: mongoose.Schema.Types.ObjectID, ref:"User", required: true},
    sharedWith: {type: mongoose.Schema.Types.ObjectID, ref:"User"},
    gifts: {type: []},
    imageUrl: {type:String, maxlength: 1024,},
   
},
      
        {timestamps: true
      
      
    
   
    
        });
   
        
  



const Model = mongoose.model("person", schema);

module.exports = Model;