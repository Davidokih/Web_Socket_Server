const mongoose = require("mongoose");
require("dotenv").config();

const url = "mongodb://0.0.0.0:27017/Chat_App";

mongoose.connect(url).then(() => {
    console.log("Connected to DataBase");
}).catch((error) => {
    console.log(error);
});

module.exports = mongoose;