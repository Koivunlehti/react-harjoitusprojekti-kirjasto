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

// ---------- Books and Categories API ----------
library_server.use("/api",books)

// ---------- Login API ----------
library_server.use("/user",login)

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
			session.expires = now + Number(process.env.SESSION_LIFE);
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
library_server.listen(process.env.PORT);