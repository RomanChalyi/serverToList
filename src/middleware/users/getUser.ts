import UsersModel from "../../models/users";
import { getResponse, getBadResponse } from "../../utils";

const getUser = async (ctx: any) => {
  try {
    const user = await UsersModel.findOne({
      _id: ctx.userId,
    });

    return getResponse({ ctx, result: { login: user.login, id: user._id } });
  } catch (err) {
    return getBadResponse({
      ctx,
      err,
    });
  }
};
export default getUser;
