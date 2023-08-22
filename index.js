const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();
require("./Utils/db");
const user_router = require("./Routers/user_router");

const port = process.env.PORT;
const app = express();

app.use(cors);
app.use(express.json());
// app.use(express.urlencoded({ extemded: true }));

app.get("/", (req, res) => {
    res.json({
        message: "Connected to Chat_App DataBase"
    });
});

app.use("/api/user", user_router);

app.listen(port, () => {
    console.log("Listening To Server");
});