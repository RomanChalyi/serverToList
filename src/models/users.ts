import { model, Schema } from "mongoose";
import _idAsId from "meanie-mongoose-to-json";
import uniqueValidator from "mongoose-unique-validator";

const UsersSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: "user already exists",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: "server error, please try again later",
    },
  },
  { versionKey: false }
);
UsersSchema.plugin(_idAsId);
UsersSchema.plugin(uniqueValidator);

export default model("users", UsersSchema);
