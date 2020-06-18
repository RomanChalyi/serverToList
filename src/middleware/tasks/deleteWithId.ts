import tasksModel from "../../models/tasks";
import { ITask } from "../../types";
import { getResponse, getBadResponse } from "../../utils";

const deleteWithId = async (ctx: any, next: any) => {
  try {
    const task: ITask = ctx.request.body;

    const deletedTask = await tasksModel.deleteOne({ _id: task.id });

    return getResponse({ ctx, result: deletedTask });
  } catch (err) {
    return getBadResponse({ ctx, err });
  }
};
export default deleteWithId;
