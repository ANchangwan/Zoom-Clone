const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message)=>{
    console.log("message : ", message.data);
});

socket.addEventListener("close", ()=>{
    console.log("disconnect");
})

setTimeout(() => {
    socket.send("send message");
}, 10000);