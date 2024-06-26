const router = require("express").Router();
const {
    create_message,
    get_message
} = require("../Controller/message_controller");
// const auth = require("../Middlewares/auth");
const auth = require("../Middlewares/auth");

router.route("/:conversationId").get(auth, get_message);
router.route("/create").post(auth, create_message);

module.exports = router;