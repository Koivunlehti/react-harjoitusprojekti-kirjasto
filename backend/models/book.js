const mongoose = require("mongoose");

let bookSchema = mongoose.Schema({
    name:{type:String, unique:true},
    writer:String,
    publisher:String,
    page_amount:Number,
    category_id:String,
    loaned:String
});

module.exports = mongoose.model("book", bookSchema);