import UsersModel from "../../models/users";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { getResponse, getBadResponse, encodeData } from "../../utils";
import { JWT_SECRET } from "../../constant";

const createUser = async (ctx: any) => {
  try {
    const { user } = ctx.request.body;
    const { login, password } = jwt.verify(user, JWT_SECRET);
    const encodePassword = encodeData(password);

    await UsersModel.create({
      login,
      password: encodePassword,
      refreshToken: uuid(),
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
