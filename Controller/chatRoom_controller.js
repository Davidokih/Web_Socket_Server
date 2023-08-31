const mongoose = require("mongoose");
const user_model = require("../Model/user_model");
const chat_room_model = require("../Model/chat_room_model");
const AppError = require("../Handlers/AppError");

const creat_chat_room = async (req, res) => {
    try {
        const { name } = req.body;
        const chatRoomExist = await chat_room_model.findOne({ name });
        if (chatRoomExist) throw new AppError(400, "Chat room already exist");

        const chatRoom = new chat_room_model({
            name
        });

        await chatRoom.save();

    } catch (error) {
        res.status(500).json({
            status: "Success",
            message: error.message
        });
    }
};

module.exports = {
    creat_chat_room
};