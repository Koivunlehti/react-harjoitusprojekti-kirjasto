const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/user");
const Session = require("../models/session");

const router = express.Router();

router.post("/login", function(req, res, next) {
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
				"expires":Date.now() + Number(process.env.SESSION_LIFE),
                "admin":user.admin
			});
			session.save().then(function() {
				return res.status(200).json({"user":req.body.name, "token":token, "admin":user.admin});
			}).catch(error => next(error))
		})
	}).catch(error => next(error)) 
});

router.post("/register", function(req, res, next) {
    bcrypt.hash(req.body.password, 14, function(err, password_hash) {
        let user = new User({
            "name":req.body.name,
            "password":password_hash,
            "admin":false
        })
        user.save().then(function(user) {
            return res.status(201).json({"Message":"Register success"})
        }).catch(error => {
            return res.status(409).json({"Message":"Username already in use"})
        })
    })
});

router.post("/logout", function(req, res, next) {
    Session.deleteOne({"token":req.headers.token})
    .then(function() {
        return res.status(200).json({"Message":"Logged out"})
    }).catch(error => next(error))
})

module.exports = router;