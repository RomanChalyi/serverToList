import jwt from "jsonwebtoken";
import UsersModel from "../../models/users";
import { getResponse, getBadResponse, decodeData } from "../../utils";
import { MaximumAuthorizedDevices } from "../../constant";

const checkUser = async (ctx: any) => {
  try {
    const { login, password } = ctx.request.body;
    const user = await UsersModel.findOne({ login });

    if (user === null) {
      throw new Error("User is not found");
    }

    const decodePassword = decodeData(user.password);
    if (decodePassword !== password) {
      throw new Error("Wrong password");
    }

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
    );

    if (user.tokens.length === MaximumAuthorizedDevices) {
      await UsersModel.updateOne(
        { _id: user.id },
        { $set: { tokens: refreshToken } }
      );
    } else {
      await UsersModel.updateOne(
        { _id: user.id },
        { $push: { tokens: refreshToken } }
      );
    }

    const result = {
      accessToken: jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
      }),
      refreshToken,
      user: user.login,
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
