const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.LOCAL_URL;
mongoose.connect(url).then(() => {
    console.log("Connected to DataBase");
}).catch((error) => {
    console.log(error);
});

module.exports = mongoose;