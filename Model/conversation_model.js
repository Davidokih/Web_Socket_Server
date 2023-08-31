const mongoose = require("mongoose");

const conversation_model = mongoose.Schema({
    members: {
        type: Array
    },
}, { timestamp: true });

module.exports = mongoose.model("conversations", conversation_model);