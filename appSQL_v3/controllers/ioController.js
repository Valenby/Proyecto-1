
exports.ws_io = (socket)=>{
    console.log('cliente conectado en socket')

    socket.on("message", (data) => {
        socket.emit("chat", data );
    });

    socket.on("disconnect", () => {
        console.log("connection close");
    });
}