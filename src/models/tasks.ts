import { model, Schema } from "mongoose";
import { DONE, ACTIVE } from "../constant/status";
import _idAsId from "meanie-mongoose-to-json";

const TaskSchema = new Schema(
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
  },
  { versionKey: false }
);
TaskSchema.plugin(_idAsId);

export default model("tasks", TaskSchema);
