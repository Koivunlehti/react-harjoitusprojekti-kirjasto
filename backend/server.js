const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

let library_server = express();
let port = process.env.PORT;

// ---------- Data Schemas ----------

let bookSchema = mongoose.Schema({
    name:{type:String, unique:true},
    writer:String,
    publisher:String,
    page_amount:Number,
    category_id:Number,
    loaned:Boolean
});

bookSchema.virtual("id").get(function() {
    return this._id
});

let categorySchema = mongoose.Schema({
    name:{type:String, unique:true}
})

// ---------- Database connection ----------

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("Database connected."),
    (error) => console.log("Database connect failed.", error)
);

// ---------- Middlewares ----------

library_server.use(express.json());

// ---------- Books API ----------

library_server.get("/api/books", function(req, res) {
    mongoose.model("book",bookSchema).find({}).then(function(books) {
        console.log(books)
        return res.status(200).json(books);
    }).catch(function(error) {
        console.log("Cannot find books.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.get("/api/books/:id", function(req, res) {
    mongoose.model("book",bookSchema).find({"_id":req.params.id}).then(function(book) {
        console.log(book)
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.post("/api/books", function(req, res) {
    console.log(req.headers)
    console.log(req.body)
    let book = new mongoose.model("book", bookSchema) ({
        "name":req.body.name,
        "writer":req.body.writer,
        "publisher":req.body.publisher,
        "page_amount":req.body.page_amount,
        "category_id":req.body.category_id,
        "loaned":req.body.loaned
    })
    book.save().then(function(book) {
        console.log(book)
        return res.status(201).json(book);
    }).catch(function(error) {
        console.log("Cannot add book.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
})

library_server.put("/api/books/:id", function(req, res) {
    let book = {
        "name":req.body.name,
        "writer":req.body.writer,
        "publisher":req.body.publisher,
        "page_amount":req.body.page_amount,
        "category_id":req.body.category_id,
        "loaned":req.body.loaned
    }
    mongoose.model("book", bookSchema).replaceOne({"_id":req.params.id},book).then(function(book) {
        console.log(book)
        return res.status(204).json(book);
    }).catch(function(error) {
        console.log("Cannot edit book.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
})

library_server.delete("/api/books/:id", function(req, res) {
    mongoose.model("book", bookSchema).deleteOne({"_id":req.params.id}).then(function(book) {
        console.log(book)
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot delete book.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
})

// ---------- Categories API ----------

library_server.get("/api/categories", function(req, res) {
    mongoose.model("category",categorySchema).find({}).then(function(categories) {
        console.log(categories)
        return res.status(200).json(categories);
    }).catch(function(error) {
        console.log("Cannot find books.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.post("/api/categories", function(req, res) {
    let category = new mongoose.model("category", categorySchema) ({
        "name":req.body.name
    })
    category.save().then(function(category) {
        console.log(category)
        return res.status(201).json(category);
    }).catch(function(error) {
        console.log("Cannot add book.", error)
        return res.status(500).json({"Message":"Internal Server Error"});
    })
})

// ---------- Server Start ----------

console.log("Server started...");
library_server.listen(port);