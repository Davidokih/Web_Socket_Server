const mongoose = require("mongoose");

const message_schema = mongoose.Schema({
    chat_room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    message: {
        type: String
    }
}, { timestamp: true });

module.exports = mongoose.model("Message", message_schema);