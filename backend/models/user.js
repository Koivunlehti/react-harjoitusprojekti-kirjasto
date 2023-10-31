const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:{type:String, unique:true},
    password:String,
    admin:Boolean
});

module.exports = mongoose.model("user", userSchema);