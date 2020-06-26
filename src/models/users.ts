import { model, Schema } from "mongoose";
import _idAsId from "meanie-mongoose-to-json";
import uniqueValidator from "mongoose-unique-validator";

const usersSchema = new Schema(
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

    tokens: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);
usersSchema.plugin(_idAsId);
usersSchema.plugin(uniqueValidator);

export default model("users", usersSchema);
