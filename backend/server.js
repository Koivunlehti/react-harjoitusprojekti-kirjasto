require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cors = require("cors");

const loggedInUsers = require("./routes/logged_in_user");

const Book = require("./models/book");
const Category = require("./models/category");
const User = require("./models/user");
const Session = require("./models/session");

let library_server = express();
let port = process.env.PORT;

const sessionLife = 360000;

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
    Book.find({}).then(function(books) {
        console.log(books);
        return res.status(200).json(books);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.get("/api/books/:id", function(req, res) {
    Book.find({"_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

library_server.get("/api/books/category/:id", function(req, res) {
    Book.find({"category_id":req.params.id}).then(function(book) {
        console.log(book);
        return res.status(200).json(book);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

// ---------- Categories API ----------

library_server.get("/api/categories", function(req, res) {
    Category.find({}).then(function(categories) {
        console.log(categories);
        return res.status(200).json(categories);
    }).catch(function(error) {
        console.log("Cannot find books.", error);
        return res.status(500).json({"Message":"Internal Server Error"});
    })
});

// ---------- User API ----------

library_server.post("/login", function(req, res) {
    User.findOne({"name":req.body.name})
    .then(function(user) {	
        bcrypt.compare(req.body.password, user.password, function(error, success) {
			if(!success) {
				return res.status(401).json({"Message":"Unauthorized"});
			}
            token = crypto.randomBytes(64).toString("hex");
            let session = Session({
                "user":req.body.name,
				"token":token,
				"expires":Date.now() + sessionLife,
                "admin":user.admin
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

library_server.post("/register", function(req, res) {
    bcrypt.hash(req.body.password, 14, function(err, password_hash) {
        let user = new User({
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

library_server.post("/logout", function(req, res) {
    Session.deleteOne({"token":req.headers.token})
    .then(function() {
        return res.status(200).json({"Message":"Logged out"})
    })
})

// ---------- More Middlewares ----------

const isUserLogged = (req,res,next) => {
    Session.findOne({"token":req.headers.token}).then(function(session) {
        if(!session) {
            console.log("no token")
			return res.status(403).json({"Message":"Forbidden"});
		}
		let now = Date.now();
		if(now > session.expires) {
            Session.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"})
			}).catch(function(error) {
				console.log("Failed to remove session. Reason",error);
				return res.status(403).json({"Message":"Forbidden"})
			})
		} else {
			session.expires = now + sessionLife;
			req.session = {};
			req.session.user = session.user;
            req.session.admin = session.admin;
			session.save().then(function() {
				return next();
			}).catch(function(error) {
				console.log("Failed to resave session. Reason",error);
				return next();
			})
		}
	}).catch(function(error){
		console.log("Failed to find session. Reason",error);
		return res.status(403).json({"Message":"Forbidden"})
	})
}

library_server.use("/admin", isUserLogged, loggedInUsers);

// ---------- Server Start ----------

console.log("Server started...");
library_server.listen(port);