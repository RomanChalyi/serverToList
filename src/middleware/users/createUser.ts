import UsersModel from "../../models/users";
import { getResponse, getBadResponse, encodeData } from "../../utils";

const createUser = async (ctx: any) => {
  try {
    const { login, password } = ctx.request.body;
    const encodePassword = encodeData(password);

    await UsersModel.create({
      login,
      password: encodePassword,
    });

    return getResponse({ ctx, result: { status: "ok" } });
  } catch (err) {
    return getBadResponse({
      ctx,
      err,
    });
  }
};
export default createUser;
