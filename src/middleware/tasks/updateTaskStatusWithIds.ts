import tasksModel from "../../models/tasks";
import { getResponse, getBadResponse } from "../../utils";

//  { _id: { $in: ids } },        $set: { status: status },
const updateAllTaskStatus = async (ctx: any) => {
  try {
    const { status, ids }: { status: string; ids: string[] } = ctx.request.body;

    const updateTask = await tasksModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status } }
    );

    return getResponse({ ctx, result: updateTask });
  } catch (err) {
    return getBadResponse({ ctx, err });
  }
};
export default updateAllTaskStatus;
