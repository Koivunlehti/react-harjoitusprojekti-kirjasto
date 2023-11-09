const express = require("express");

const Book = require("../models/book");
const Category = require("../models/category");

const router = express.Router();

router.get("/books", function(req, res, next) {
    Book.find({}).then(function(books) {
        console.log(books);
        return res.status(200).json(books);
    }).catch(error => next(error)) 
});

router.get("/books/:id", function(req, res, next) {
    Book.find({"_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(error => next(error)) 
});

router.get("/books/category/:id", function(req, res, next) {
    Book.find({"category_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(error => next(error))
});

router.get("/books/loaned/:user", function(req, res, next) {
    Book.find({"loaned":req.params.user}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(error => next(error)) 
});

// ---------- Categories API ----------

router.get("/categories", function(req, res, next) {
    Category.find({}).then(function(categories) {
        console.log(categories);
        return res.status(200).json(categories);
    }).catch(error => next(error))
});

module.exports = router;