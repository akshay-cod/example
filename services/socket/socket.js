const socket = require("socket.io");

function getKey(map,val) {
    return [...map].find(([key, value]) => val === value)[0];
  }

exports.initialiseSocket = (server) => {
    const io = socket(server, {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });
      
      global.onlineUsers = new Map();
      
      io.on("connection", (socket) => {
        global.chatSocket = socket;
        console.log(onlineUsers)
        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });
      
        socket.on("disconnect", (reason) => {
           console.log(reason,socket.id)
           if(onlineUsers.size != 0){
           let key = getKey(onlineUsers,socket.id)
            onlineUsers.delete(key)
           }
        });
      
      //   socket.on("send-msg", (data) => {
      //     const sendUserSocket = onlineUsers.get(data.to);
      //     if (sendUserSocket) {
      //       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      //     }
      //   });
      });
      console.log("socket is running",)
}