import jwt from "jsonwebtoken";

const connectedUsers = [];

export const socket = (socket) => {
  socket.on("user logged in", (token) => {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const indexConnectedUser = connectedUsers.findIndex(
      (user) => user.id === id
    );
    if (indexConnectedUser === -1) {
      connectedUsers.push({ id, socketIDs: [socket.id] });
    } else {
      connectedUsers[indexConnectedUser].socketIDs.push(socket.id);
    }
  });

  socket.on("disconnect", () => {
    connectedUsers.forEach((user) => {
      if (user.socketIDs.includes(socket.id)) {
        const socketIDs = user.socketIDs.filter(
          (socketId) => socketId !== socket.id
        );
        user.socketIDs = socketIDs;
      }
    });
  });
  //
  socket.on("update tasks", (token) => {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const indexConnectedUser = connectedUsers.findIndex(
      (user) => user.id === id
    );

    connectedUsers[indexConnectedUser].socketIDs.forEach((socketId) => {
      if (socketId !== socket.id) {
        socket.to(socketId).emit("load tasks");
      }
    });
  });
};
