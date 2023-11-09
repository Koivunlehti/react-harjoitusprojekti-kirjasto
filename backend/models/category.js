const mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
    name:{
        type:String, 
        unique:true,
        required:true,
        minlength:3
    },
    description: {
        type:String,
        maxlength:200
    }
});

module.exports = mongoose.model("category", categorySchema);