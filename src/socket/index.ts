import jwt from "jsonwebtoken";

export const socket = (socket) => {
  socket.on("user logged in", (token) => {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    socket.join(id);
  });

  socket.on("update tasks", (token) => {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    socket.to(id).emit("load tasks");
  });
};
