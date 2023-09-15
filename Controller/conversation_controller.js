const conversation_model = require("../Model/conversation_model");

const createConversation = async (req, res) => {
    try {
        const newConversation = new conversation_model({
            members: [ req.user.id, req.body.receiverId ]
        });

        const savedConversation = await newConversation.save();
        res.status(200).json({
            status: "Success",
            data: savedConversation
        });
    } catch (error) {
        res.status(500).json({
            status: "An error occured",
            message: error.message
        });
    }
};

const get_conversation = async (req, res) => {
    try {
        const id = req.user.id;

        const conversation = await conversation_model.find({
            members: { $in: [ id ] }
        });

        res.status(200).json({
            status: "Success",
            data: conversation
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

module.exports = {
    createConversation,
    get_conversation
};