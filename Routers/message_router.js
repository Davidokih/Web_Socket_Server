const router = require("express").Router();
const {
    create_message,
    get_message
} = require("../Controller/message_controller");
// const auth = require("../Middlewares/auth");

router.route("/:conversationID").get(get_message);
router.route("/create").post(create_message);

module.exports = router;