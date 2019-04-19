const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    pushToken: String,
    movies: [],
  }
);

userSchema.plugin(uniqueValidator);

userSchema.methods.generateAuthToken = function (expireTime = '30d') {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_KEY,
    { expiresIn: expireTime }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
