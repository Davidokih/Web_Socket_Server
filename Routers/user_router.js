const express = require("express");
const { signUp_user, get_user, get_single_user, update_user, delete_user, signin_user, All_User } = require("../Controller/user_controller");
const router = express.Router();
const auth = require("../Middlewares/auth");

router.route("/").get(get_user);
router.route("/all").get(All_User);
router.route("/signup").post(signUp_user);
router.route("/signin").post(signin_user);

router.route("/single_user")
    .get(auth, get_single_user)
    .patch(auth, update_user)
    .delete(auth, delete_user);

module.exports = router;