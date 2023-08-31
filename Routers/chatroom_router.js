const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");
const {
    creat_chat_room
} = require("../Controller/chatRoom_controller");

router.route("/create").post(auth, creat_chat_room);

module.exports = router;