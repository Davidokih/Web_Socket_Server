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

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('User Connected to socket.io');
    socket.on('setup', (userId) => {
        socket.join(userId);
        addUser(userId, socket.id);
        socket.emit('getUsers', users);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User Join Room: ' + room);
    });

    socket.on('new message', ({ newMessageRecieved, currentChat }) => {
        let chat = newMessageRecieved;
        // const user = getUser(recieverId);
        if (!chat.sendeId) return console.log('chat.user not defined');
        console.log(currentChat);
        for (x in currentChat.members) {
            if (x === chat.senderId) return;
            // if (chat.newMessageRecieved.sendeId ) return;

            socket.to(x).emit('message recieved', newMessageRecieved);
        }
    });
});

