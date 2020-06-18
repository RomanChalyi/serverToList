import UsersModel from "../../models/users";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import {
  getResponse,
  getBadResponse,
  encodeData,
  decodeData,
} from "../../utils";
import { JWT_SECRET } from "../../constant";

const checkUser = async (ctx: any) => {
  try {
    const { user } = ctx.request.body;
    const { login, password } = jwt.verify(user, JWT_SECRET);

    const dbUser = await UsersModel.findOne({
      login,
    });

    if (dbUser === null) {
      throw new Error("User is not found");
    }

    const decodePassword = decodeData(dbUser.password);
    if (decodePassword !== password) {
      throw new Error("Wrong password");
    }

    const result = {
      payload: jwt.sign(
        {
          login: dbUser.login,
          id: dbUser.id,
          refreshToken: dbUser.refreshToken,
          accessToken: uuid(),
        },
        JWT_SECRET,
        { expiresIn: 60 * 15 }
      ),
    };

    return getResponse({ ctx, result });
  } catch (err) {
    return getBadResponse({
      ctx,
      err,
    });
  }
};
export default checkUser;
