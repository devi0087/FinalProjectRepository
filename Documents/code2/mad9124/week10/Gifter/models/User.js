const bcrypt = require('bcrypt');
const saltRounds = 14;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require("validator");
require("dotenv").config();

const schema = new mongoose.Schema({
  firstName: { type: String, maxlength: 64, required: true },
  lastName: { type: String, maxlength: 64, required: true },
  password: { type: String, maxlength: 70, required: true },
  email: { type: String, maxlength: 512, required: true, unique:true ,
    validate: {
      validator: value => validator.isEmail(value),
      message: props => `${props.value} is not a valid email address.`
    }
  }
  },
  {
      timestamps: true
    }

);
 
schema.plugin(uniqueValidator, {
  message: props =>
  props.path === 'email'
    ? `The email address '${props.value}' is already registered.`
    : `The ${props.path} must be unique. '${props.value}' is already in use.`
});
  


schema.methods.generateAuthToken = function() {
    //return jwt.sign({ _id: this._id }, 'superSecureSecret');
    return jwt.sign({ _id: this._id }, process.env.TOKENKEY);
  };



  schema.statics.authenticate = async function(email, password) {
    const user = await this.findOne({ email: email });
    const hashedPassword = user
      ? user.password
      : `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    const passwordDidMatch = await bcrypt.compare(password, hashedPassword);
  
    return passwordDidMatch ? user : null;
    // remember if the email did not match, user === null
  };

  schema.pre('save', async function(next) {
    // Only encrypt if the password property is being changed.
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  });

  schema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
  };

const Model = mongoose.model('User', schema); // factory function returns a class

module.exports = Model;