import tasksModel from "../../models/tasks";
import { getResponse, getBadResponse } from "../../utils";

const deleteWithIds = async (ctx: any) => {
  try {
    const ids: string[] = ctx.request.body;
    const deletedTasks = await tasksModel.deleteMany({
      _id: ids,
    });

    return getResponse({ ctx, result: deletedTasks });
  } catch (err) {
    return getBadResponse({ ctx, err });
  }
};
export default deleteWithIds;
