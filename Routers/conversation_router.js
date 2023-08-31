const router = require("express").Router();
const { createConversation, get_conversation } = require("../Controller/conversation_controller");
// const auth = require("../Middlewares/auth");

router.route("/:userID").get(get_conversation);
router.route("/room").post(createConversation);

module.exports = router;