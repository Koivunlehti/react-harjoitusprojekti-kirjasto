const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Book = require("../models/book");

// ---------- Normal user routes ----------

router.put("/books/loan/:id",function(req, res) {
    Book.findById({"_id":req.params.id})
    .then(function(book) {
        if (book != null) {
            if (book.loaned === "") {
                let newBook = {
                "name":book.name,
                "writer":book.writer,
                "publisher":book.publisher,
                "page_amount":book.page_amount,
                "category_id":book.category_id,
                "loaned": req.session.user
                };
                Book.replaceOne({"_id":req.params.id}, newBook)
                .then(function(book) {
                    return res.status(204).json(book);
                }).catch(function(error) {
                    console.log("Cannot edit book.", error);
                    return res.status(500).json({"Message":"Internal Server Error"});
                })
            } else {
                return res.status(404).json({"Message":"book already loaned"});
            }
        } else {
            return res.status(404).json({"Message":"Cannot find book"});
        }
    }).catch(function(error) {
        console.log("Error while finding book", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
})

router.put("/books/return/:id",function(req, res) {
    Book.findById({"_id":req.params.id})
    .then(function(book) {
        if (book != null) {
            if (book.loaned !== "" && book.loaned === req.session.user) 
            {
                let newBook = {
                "name":book.name,
                "writer":book.writer,
                "publisher":book.publisher,
                "page_amount":book.page_amount,
                "category_id":book.category_id,
                "loaned": ""
                };
                Book.replaceOne({"_id":req.params.id}, newBook)
                .then(function(book) {
                    return res.status(204).json(book);
                }).catch(function(error) {
                    console.log("Cannot edit book.", error);
                    return res.status(500).json({"Message":"Internal Server Error"});
                })
            } else {
                return res.status(404).json({"Message":"Cannot return book"});
            }
        } else {
            return res.status(404).json({"Message":"Cannot find book"});
        }
    }).catch(function(error) {
        console.log("Error while finding book", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
})



// ---------- Admin user routes ----------

router.post("/books", function(req, res) {
    if (req.session.admin) {
        let book = new Book ({
            "name":req.body.name,
            "writer":req.body.writer,
            "publisher":req.body.publisher,
            "page_amount":req.body.page_amount,
            "category_id":req.body.category_id,
            "loaned":""
        });
        book.save().then(function(book) {
            console.log(book);
            return res.status(201).json(book);
        }).catch(function(error) {
            console.log("Cannot add book.", error);
            return res.status(500).json({"Message":"Internal Server Error"});
        })
    } else {
        console.log("Not admin")
        return res.status(403).json({"Message":"Forbidden"})
    }
});

router.put("/books/:id", function(req, res) {
    if (req.session.admin) {
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
    } else {
        console.log("Not admin")
        return res.status(403).json({"Message":"Forbidden"})
    }
});

router.delete("/books/:id", function(req, res) {
    if (req.session.admin) {
        Book.deleteOne({"_id":req.params.id}).then(function(book) {
            console.log(book);
            return res.status(200).json(book);
        }).catch(function(error) {
            console.log("Cannot delete book.", error);
            return res.status(500).json({"Message":"Internal Server Error"});
        })
    } else {
        console.log("Not admin")
        return res.status(403).json({"Message":"Forbidden"})
    }
});

router.post("/categories", function(req, res) {
    if (req.session.admin) {
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
    } else {
        console.log("Not admin")
        return res.status(403).json({"Message":"Forbidden"})
    }
});

module.exports = router;