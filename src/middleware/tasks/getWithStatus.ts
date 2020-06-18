import tasksModel from "../../models/tasks";
import { ITask } from "../../types";
import { getResponse, getBadResponse } from "../../utils";
import { ALL } from "../../constant";

const getWithStatus = async (ctx: any) => {
  try {
    const { page, limit, status } = ctx.request.query;

    const skip = page > 1 ? (page - 1) * limit : 0;
    const statusTask = status ? { status } : {};

    const tasks: ITask[] = await tasksModel
      .find(statusTask)
      .limit(+limit)
      .skip(skip);

    const totalElements = await tasksModel.countDocuments(statusTask);
    const filter = status ? status : ALL;
    return getResponse({
      ctx,
      result: { tasks, totalElements, limit, offset: page, filter },
    });
  } catch (err) {
    return getBadResponse({ ctx, err });
  }
};

export default getWithStatus;
