import tasksModel from "../../models/tasks";
import { ITask } from "../../types";
import { getResponse, getBadResponse } from "../../utils";

const update = async (ctx: any) => {
  try {
    const task: ITask = ctx.request.body;

    const updateTask = await tasksModel.updateOne(
      { _id: task.id },
      { $set: { value: task.value, status: task.status } }
    );

    return getResponse({ ctx, result: updateTask });
  } catch (err) {
    return getBadResponse({ ctx, err });
  }
};
export default update;
