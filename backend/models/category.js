const mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
    name:{
        type:String, 
        unique:[true, "Category name already exists."],
        required:[true, "Category name cannot be empty."], 
        minlength:[3, "Category name is too short."] 
    },
    description: {
        type:String,
        maxlength:[200, "Category description is too long."]
    }
});

module.exports = mongoose.model("category", categorySchema);