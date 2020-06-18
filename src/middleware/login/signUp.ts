import UsersModel from "../../models/users";

import { getResponse, getBadResponse } from "../../utils";

const signUp = async (ctx: any) => {
  try {
    const userData = ctx.request.body;

    await UsersModel.create(userData);

    return getResponse({ ctx, result: { created: "success" }, status: 201 });
  } catch (err) {
    return getBadResponse({ ctx, err, message: "User already exists" });
  }
};
export default signUp;
