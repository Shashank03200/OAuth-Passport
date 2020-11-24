const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: "string",
    googleId:"string",
   thumbnail:"string"
});

const User = mongoose.model("user", userSchema);

module.exports = User;