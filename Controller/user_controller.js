const user_model = require("../Model/user_model");
const AppError = require("../Handlers/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp_user = async (req, res) => {
    try {
        const { email, password, phone_No, userName } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = await user_model.create({
            userName,
            phone_No,
            email,
            password: hashed
        });

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

const signin_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await user_model.findOne({ email });
            if (user) {
                const comparePassword = await bcrypt.compare(password, user.password);
                if (comparePassword) {
                    const getUser = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRED_DATE });

                    const { password, ...info } = user._doc;

                    res.status(200).json({
                        status: "Success",
                        data: getUser
                    });
                } else {
                    throw new AppError(400, "Invalid password");
                }
            } else {
                throw new AppError(400, "User not found");
            }
        } else {
            throw new AppError(400, "User eamil and password must be added");
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
        console.log(error);
    }
};

const get_user = async (req, res) => {
    try {
        const userId = req.query.userId;
        const userName = req.query.userName;
        const users = userId ? await user_model.findById(userId) : await user_model.findOne({ userName: userName });

        const { password, updatedAt, ...other } = users._doc;
        res.status(200).json({
            status: "Success",
            data: other
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const All_User = async (req, res) => {
    try {
        const user = await user_model.find();

        res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
        console.log(error);
    }
};

const get_single_user = async (req, res) => {
    try {
        const user = await user_model.findById(req.user.id);
        // console.log(req.user);
        if (!user) {
            throw new AppError(400, "user dose not exist");
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
        console.log(error);
    }
};

const update_user = async (req, res) => {
    try {
        const { phone_No, user_Name, email } = req.body;
        const user = await user_model.find({ _id: req.user.id });
        if (!user) {
            throw new AppError(400, "user dose not exist");
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
        const remove_user = await user_model.findByIdAndDelete(req.user.id);

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
    delete_user,
    signin_user,
    All_User
};