const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

require('dotenv').config();
const cors = require("cors");

let library_server = express();
let port = process.env.PORT;

const sessionLife = 360000;

// ---------- Data Schemas ----------

let bookSchema = mongoose.Schema({
    name:{type:String, unique:true},
    writer:String,
    publisher:String,
    page_amount:Number,
    category_id:String,
    loaned:Boolean
});

// bookSchema.virtual("id").get(function() {
//     return this._id
// });

let categorySchema = mongoose.Schema({
    name:{type:String, unique:true}
});

let userSchema = mongoose.Schema({
    name:{type:String, unique:true},
    password:String,
    admin:Boolean
});

let sessionSchema = mongoose.Schema({
    user:String,
    token:String,
    created:Number
})
// ---------- Database connection ----------

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("Database connected."),
    (error) => console.log("Database connect failed.", error)
);

// ---------- Middlewares ----------

library_server.use(express.json());
library_server.use(cors());

// ---------- Books API ----------

library_server.get("/api/books", function(req, res) {
    mongoose.model("book",bookSchema).find({}).then(function(books) {
        console.log(books);
        return res.status(200).json(books);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.get("/api/books/:id", function(req, res) {
    mongoose.model("book",bookSchema).find({"_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.get("/api/books/category/:id", function(req, res) {
    mongoose.model("book",bookSchema).find({"category_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.post("/api/books", function(req, res) {
    console.log(req.headers);
    console.log(req.body);
    let book = new mongoose.model("book", bookSchema) ({
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

library_server.put("/api/books/:id", function(req, res) {
    let book = {
        "name":req.body.name,
        "writer":req.body.writer,
        "publisher":req.body.publisher,
        "page_amount":req.body.page_amount,
        "category_id":req.body.category_id,
        "loaned":req.body.loaned
    };
    mongoose.model("book", bookSchema).replaceOne({"_id":req.params.id},book).then(function(book) {
        console.log(book);
        return res.status(204).json(book);
    }).catch(function(error) {
        console.log("Cannot edit book.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.delete("/api/books/:id", function(req, res) {
    mongoose.model("book", bookSchema).deleteOne({"_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot delete book.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

// ---------- Categories API ----------

library_server.get("/api/categories", function(req, res) {
    mongoose.model("category",categorySchema).find({}).then(function(categories) {
        console.log(categories);
        return res.status(200).json(categories);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.post("/api/categories", function(req, res) {
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

// ---------- User API ----------

library_server.post("/api/login", function(req, res) {
    mongoose.model("user", userSchema).findOne({"name":req.body.name})
    .then(function(user) {	
        bcrypt.compare(req.body.password, user.password, function(error, success) {
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"});
			}
            token = crypto.randomBytes(64).toString("hex");
			let session = mongoose.model("session", sessionSchema) ({
                "user":req.body.username,
				"token":token,
				"created":Date.now() + sessionLife
			});
			session.save().then(function() {
				return res.status(200).json({"token":token});
			}).catch(function(error) {
				console.log(error);
				return res.status(500).json({"Message":"Internal Server Error"});
			});
		})
	}).catch(function(error) {
		console.log(error);
		return res.status(500).json({"Message":"Internal Server Error"})
	})
});

library_server.post("/api/register", function(req, res) {
    bcrypt.hash(req.body.password, 14, function(err, password_hash) {
        let user = new mongoose.model("user",userSchema) ({
            "name":req.body.name,
            "password":password_hash,
            "admin":req.body.admin
        })
        user.save().then(function(user) {
            return res.status(201).json({"Message":"Register success"})
        }).catch(function(error) {
            return res.status(409).json({"Message":"Username already in use"})
        })
    })
});

library_server.post("/api/logout", function(req, res) {
    mongoose.model("session", sessionSchema).deleteOne({"token":req.headers.token})
    .then(function() {
        return res.status(200).json({"Message":"Logged out"})
    })
})
// ---------- Server Start ----------

console.log("Server started...");
library_server.listen(port);