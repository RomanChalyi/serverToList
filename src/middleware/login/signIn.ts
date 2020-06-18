import UsersModel from "../../models/users";

import { getResponse, getBadResponse } from "../../utils";

const signIn = async (ctx: any) => {
  try {
    const userData = ctx.request.body;
    const user = await UsersModel.findOne(userData);
    if (user === null) {
      throw new Error();
    }

    return getResponse({ ctx, result: user });
  } catch (err) {
    return getBadResponse({
      ctx,
      err,
      message:
        "User does not exist or you probably entered the wrong email or password",
    });
  }
};
export default signIn;
