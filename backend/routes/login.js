const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/user");
const Session = require("../models/session");

const router = express.Router();

router.post("/login", function(req, res, next) {
    if(req.body.name && req.body.password) {
        User.findOne({"name":req.body.name})
        .then(function(user) {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(error, success) {
                    if (success) {
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
                    } else 
                        return res.status(401).json({"Message":"Unauthorized"});
                })
            }
            else 
                return res.status(401).json({"Message":"Unauthorized"});
        }).catch(error => next(error))
    }
    else 
        return res.status(400).json({ "Message": "Missing username or password" })

});

router.post("/register", function(req, res, next) {
    if(req.body.name && req.body.password) {
        if (req.body.password.length >= 4)
            User.countDocuments({})
            .then((count) => {
                bcrypt.hash(req.body.password, 14, function(err, password_hash) {
                    let user = new User({
                        "name":req.body.name,
                        "password":password_hash,
                        "admin": count === 0 ? true : false
                    })
                    user.save()
                    .then(function(user) {
                        return res.status(201).json({"Message":"Register success"})
                    })
                    .catch(error => next(error))
                })
            })
            .catch(error => next(error))
        else {
            return res.status(400).json({ "Message": "Password is too short" })
        }
    }
    else 
        return res.status(400).json({ "Message": "Missing username or password" })
});

router.post("/logout", function(req, res, next) {
    Session.deleteOne({"token":req.headers.token})
    .then(function() {
        return res.status(200).json({"Message":"Logged out"})
    }).catch(error => next(error))
})

module.exports = router;