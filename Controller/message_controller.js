const message_schema = require("../Model/message_model");
// const conversation_model = require("../Model/conversation_model");

const create_message = async (req, res) => {
    try {
        const id = req.user.id;
        const message = await message_schema({
            conversationId: req.body.conversationId,
            sendeId: id,
            message: req.body.message
        });

        const saved_message = await message.save();
        res.status(201).json({
            status: "Success",
            data: saved_message
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

const get_message = async (req, res) => {
    try {
        const id = req.user.id;

        const message = await message_schema.find({ conversationId: id });

        res.status(200).json({
            status: "Success",
            data: message
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

module.exports = {
    create_message,
    get_message
};