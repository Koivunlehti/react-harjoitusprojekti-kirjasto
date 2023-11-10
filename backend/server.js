require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const books = require("./routes/books")
const login = require("./routes/login");
const loggedInUsers = require("./routes/logged_in_user");

const Session = require("./models/session");

let library_server = express();

// ---------- Database connection ----------

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("Database connected."),
    (error) => console.log("Database connect failed.", error)
);

// ---------- Middlewares ----------

library_server.use(express.json());
library_server.use(cors());

// ---------- Books and Categories routes ----------
library_server.use("/api",books)

// ---------- Login routes ----------
library_server.use("/user",login)

// ---------- Function for checking logged in status before admin routes ---------- 
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
				console.log("Failed to remove session.", error);
				return res.status(403).json({"Message":"Forbidden"})
			})
		} else {
			session.expires = now + Number(process.env.SESSION_LIFE);
			req.session = {};
			req.session.user = session.user;
            req.session.admin = session.admin;
			session.save().then(function() {
				return next();
			}).catch(function(error) {
				console.log("Failed to resave session.", error);
				return next();
			})
		}
	}).catch(function(error){
		console.log("Failed to find session.", error);
		return res.status(401).json({"Message":"Forbidden"})
	})
}

// ---------- Admin routes ----------
library_server.use("/admin", isUserLogged, loggedInUsers);


// ---------- Error handling middleware ----------
const errorHandler = (error, request, response, next) => {
    console.log("error name:", error.name)
	console.log("error message:", error.message)
	//console.log("error", error)
	
    if (error.name === "CastError") 
		return response.status(400).json({ "error": "Format of the id is wrong." })
	else if (error.name === "ValidationError") 
		return response.status(400).json({ "error": error.message })
	else if (error.name === "MongoServerSelectionError")
		return response.status(500).json({ "error": "Cannot connect to database." })
	else if (error.name === "MongoServerError")
		if (error.code === 11000)
			return response.status(500).json({"error": "Value '" + error.keyValue.name + "' already exists."})
		else
			return response.status(500).json({ "error": "Database error." })
	next(error) 
}
library_server.use(errorHandler)

// ---------- Server Start ----------

console.log("Server started...");
library_server.listen(process.env.PORT);