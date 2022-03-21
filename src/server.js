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
    sockets.push(socket);
    console.log("Connect to Browser");
    socket.on("close", () =>{
        console.log("disconnect");
    })
    socket.on("message", (message) =>{
        sockets.forEach(aSocket => {
            aSocket.send(message);
        });
    })
    
});

server.listen(3000, handleListen);
