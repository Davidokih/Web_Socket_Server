const mongoose = require("mongoose");

const user_schema = mongoose.Schema({
    phone_No: {
        type: Number,
        required: true
    },
    userName: { type: String, required: true },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamp: true });

module.exports = mongoose.model("users", user_schema);