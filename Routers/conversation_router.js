const router = require("express").Router();
const { createConversation, get_conversation } = require("../Controller/conversation_controller");
const auth = require("../Middlewares/auth");

router.route("/").get(auth, get_conversation);
router.route("/create").post(auth, createConversation);

module.exports = router;