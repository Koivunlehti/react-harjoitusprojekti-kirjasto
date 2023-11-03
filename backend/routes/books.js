const express = require("express");

const Book = require("../models/book");
const Category = require("../models/category");

const router = express.Router();

router.get("/books", function(req, res) {
    Book.find({}).then(function(books) {
        console.log(books);
        return res.status(200).json(books);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

router.get("/books/:id", function(req, res) {
    Book.find({"_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

router.get("/books/category/:id", function(req, res) {
    Book.find({"category_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

router.get("/books/loaned/:user", function(req, res) {
    Book.find({"loaned":req.params.user}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

// ---------- Categories API ----------

router.get("/categories", function(req, res) {
    Category.find({}).then(function(categories) {
        console.log(categories);
        return res.status(200).json(categories);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

module.exports = router;