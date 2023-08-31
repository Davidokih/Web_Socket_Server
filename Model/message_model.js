const mongoose = require("mongoose");

const message_schema = mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations"
    },
    sendeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    message: {
        type: String
    }
}, { timestamp: true });

module.exports = mongoose.model("Message", message_schema);