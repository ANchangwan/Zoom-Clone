import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();


app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res)=>{
   res.render("home");
})

const handleListen = () =>{
    console.log("Listening on http://localhost:3000");
}

const server = http.createServer(app);

const wss = new WebSocket.Server({
    server
});

const sockets = [];

wss.on("connection", (socket)=>{
    console.log(sockets);
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connect to Browser");
    socket.on("close", () =>{
        console.log("disconnect");
    })
    socket.on("message", (msg) =>{
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}:${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    });
    
});

server.listen(3000, handleListen);
