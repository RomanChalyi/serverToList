import tasksModel from "../../models/tasks";
import { ITask } from "../../types";
import { getResponse, getBadResponse } from "../../utils";

const create = async (ctx: any) => {
  try {
    const task: ITask = ctx.request.body;

    const createdTask = await tasksModel.create({
      ...task,
      userId: ctx.userId,
    });

    return getResponse({ ctx, result: createdTask, status: 201 });
  } catch (err) {
    return getBadResponse({ ctx, err });
  }
};
export default create;
