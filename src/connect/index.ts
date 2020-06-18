import { connect as mongooseConnect, set } from "mongoose";
import { DB_TODO_LIST, DB_PORT, HOST } from "../constant";

const dbName: string = DB_TODO_LIST;

const connect = () =>
  mongooseConnect(`mongodb://${HOST}:${DB_PORT}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
set("useCreateIndex", true);

export default connect;
