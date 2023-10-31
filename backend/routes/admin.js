const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Book = require("../models/book")

// Books API

router.put("/book/loan/:id",function(req,res) {
    return res.status(200).json({"Message":"Book loaned"})
})

router.post("/books", function(req, res) {
    let book = new Book ({
        "name":req.body.name,
        "writer":req.body.writer,
        "publisher":req.body.publisher,
        "page_amount":req.body.page_amount,
        "category_id":req.body.category_id,
        "loaned":req.body.loaned
    });
    book.save().then(function(book) {
        console.log(book);
        return res.status(201).json(book);
    }).catch(function(error) {
        console.log("Cannot add book.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

router.put("/books/:id", function(req, res) {
    let book = {
        "name":req.body.name,
        "writer":req.body.writer,
        "publisher":req.body.publisher,
        "page_amount":req.body.page_amount,
        "category_id":req.body.category_id,
        "loaned":req.body.loaned
    };
    Book.replaceOne({"_id":req.params.id},book).then(function(book) {
        console.log(book);
        return res.status(204).json(book);
    }).catch(function(error) {
        console.log("Cannot edit book.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

router.delete("/books/:id", function(req, res) {
    Book.deleteOne({"_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot delete book.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

// Categories API

router.post("/api/categories", function(req, res) {
    let category = new mongoose.model("category", categorySchema) ({
        "name":req.body.name
    });
    category.save().then(function(category) {
        console.log(category);
        return res.status(201).json(category);
    }).catch(function(error) {
        console.log("Cannot add book.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

module.exports = router;