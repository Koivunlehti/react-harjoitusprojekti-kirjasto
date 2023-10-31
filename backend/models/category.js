const mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
    name:{type:String, unique:true}
});

module.exports = mongoose.model("category", categorySchema);