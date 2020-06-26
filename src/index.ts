import Koa from "koa";
import socketIo from "socket.io";
import logger from "koa-morgan";
import bodyParser from "koa-bodyparser";
import router from "./router";
import connect from "./connect";
import cors from "@koa/cors";
import { PORT } from "./constant";
import { socket } from "./socket";

export const server: any = new Koa();

server.use(cors());
server.use(logger("tiny"));
server.use(bodyParser());
server.use(router.routes());

connect();

const io = socketIo(server.listen(PORT));

io.on("connection", socket);
