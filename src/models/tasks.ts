import { model, Schema } from "mongoose";
import { DONE, ACTIVE } from "../constant/status";
import _idAsId from "meanie-mongoose-to-json";

const taskSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: ACTIVE,
      enum: [ACTIVE, DONE],
    },

    userId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
taskSchema.plugin(_idAsId);

export default model("tasks", taskSchema);
