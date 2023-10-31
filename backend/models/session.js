const mongoose = require("mongoose");

let sessionSchema = mongoose.Schema({
    user:String,
    token:String,
    expires:Number,
    admin:Boolean
})

module.exports = mongoose.model("session", sessionSchema);