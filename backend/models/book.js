const mongoose = require("mongoose");

let bookSchema = mongoose.Schema({
    name:{
        type:String, 
        unique: [true, "Book name already exists"],
        required: [true, "Book name cannot be empty"]
    },
    writer:String,
    publisher:String,
    page_amount:Number,
    category_id:String,
    description:{
        type:String,
        maxlength:[500, "Book Description is too long"]
    },
    loaned:String
});

module.exports = mongoose.model("book", bookSchema);