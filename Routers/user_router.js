const express = require("express");
const { signUp_user, get_user, get_single_user, update_user, delete_user } = require("../Controller/user_controller");
const router = express.Router();

router.route("/").get(get_user);
router.route("/signup").post(signUp_user);

router.route("/:id")
    .get(get_single_user)
    .patch(update_user)
    .delete(delete_user);

module.exports = router;