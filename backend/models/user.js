const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:{
        type:String, 
        unique:[true, "Username already exists."],
        minlength:[2, "Username is too short."],
        required:[true, "Username cannot be empty."]
    },
    password: {
        type:String,
        minlength:[4, "Password is too short."],
        required:[true,"Password cannot be empty."]
    },
    admin:Boolean
});

module.exports = mongoose.model("user", userSchema);