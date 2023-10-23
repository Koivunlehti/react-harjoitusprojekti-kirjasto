const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

let library_server = express();
let port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("Database connected."),
    (error) => console.log("Database connect failed.",error)
)

library_server.use(express.json());

library_server.get("/api/books", function(req, res) {
    return res.status(200).json([])
})


console.log("Server started...")
library_server.listen(port)