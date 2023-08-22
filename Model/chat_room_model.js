const mongoose = require("mongoose");

const chat_room_schema = mongoose.Schema({
    user_Name: { type: String, required: true },
}, { timestamp: true });

module.exports = mongoose.model("chats", chat_room_schema);