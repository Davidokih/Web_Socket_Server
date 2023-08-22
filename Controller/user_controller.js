const user_model = require("../Model/user_model");
const AppError = require("../Handlers/AppError");

const signUp_user = async (req, res) => {
    try {
        const user = await user_model.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "User created Successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const get_user = async (req, res) => {
    try {
        const users = await user_model.find();

        res.status(200).json({
            status: "Success",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const get_single_user = async (req, res) => {
    try {
        const user = await user_model.findById(req.params.id);
        if (!user) {
            next(new AppError(400, "user dose not exist"));
        }

        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const update_user = async (req, res) => {
    try {
        const { phone_No, user_Name, email } = req.body;
        const user = await user_model.find({ _id: req.params.id });
        if (!user) {
            next(new AppError(400, "user dose not exist"));
        }

        const update = await user_model.findByIdAndUpdate(user._id, {
            phone_No,
            user_Name,
            email,
            avatar: req.file.path
        }, { new: true });

        res.status(200).json({
            status: "Success",
            data: update
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const delete_user = async (req, res) => {
    try {
        const remove_user = await user_model.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "Fail",
            message: "User Deleted SuccessFully"
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

module.exports = {
    signUp_user,
    get_user,
    get_single_user,
    update_user,
    delete_user
};