import Koa from "koa";
import logger from "koa-morgan";
import bodyParser from "koa-bodyparser";
import router from "./router";
import connect from "./connect";
import cors from "@koa/cors";
import { PORT } from "./constant";

export const server: any = new Koa();
connect();
server.use(cors());
server.use(logger("tiny"));
server.use(bodyParser());
server.use(router.routes());
server.listen(PORT);
