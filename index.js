const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Utils/db");
const user_router = require("./Routers/user_router");
const chatroom_router = require("./Routers/chatroom_router");
const conversation_router = require("./Routers/conversation_router");
const message_router = require("./Routers/message_router");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "Connected to Chat_App DataBase"
    });
});

app.use("/api/user", user_router);
app.use("/api/chatroom", chatroom_router);
app.use("/api/coversation", conversation_router);
app.use("/api/message", message_router);

const server = app.listen(port, () => {
    console.log("Listening To Server");
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:5173'
    }
});

io.on('connection', (socket) => {
    console.log('User Connected to socket.io');
    socket.on('setup', (userData) => {
        socket.join(userData?._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User Join Room: ' + room);
    });

    socket.on('new message', (newMessageRecieved,recieverId) => {
        let chat = newMessageRecieved;

        // console.log(chat);
        if (!chat.newMessageRecieved.sendeId) return console.log('chat.user not defined');

        if (newMessageRecieved.sendeId ) return;

        io.to(recieverId).emit('message recieved', newMessageRecieved);
    });
});

