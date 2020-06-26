import usersModel from "../../models/users";
import { getResponse, getBadResponse, encodeData } from "../../utils";

const logout = async (ctx: any) => {
  try {
    const { token } = ctx.request.body;

    await usersModel.updateOne({ tokens: token }, { $pull: { tokens: token } });

    return getResponse({ ctx, result: { status: "ok" } });
  } catch (err) {
    return getBadResponse({
      ctx,
      err,
    });
  }
};
export default logout;
