import jwt from "jsonwebtoken";
import { getBadResponse, getResponse } from "../../utils";
import { usersModel } from "../../models";

const updateAccessToken = async (ctx) => {
  try {
    const { refreshToken } = ctx.request.body;

    const userDb = await usersModel.findOne({
      tokens: refreshToken,
    });

    if (userDb === null) {
      return ctx.throw(401, "access_denied");
    }

    if (!userDb.tokens.includes(refreshToken)) {
      return ctx.throw(401, "access_denied");
    }

    const tokens = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          //*remove invalid token in db
          await usersModel.updateOne(
            { tokens: refreshToken },
            { $pull: { tokens: refreshToken } }
          );
          return null;
        }

        //* create tokens
        const tokens = { refreshToken: "", accessToken: "" };

        tokens.refreshToken = jwt.sign(
          { id: decoded.id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
        );

        tokens.accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
          }
        );

        //* update token in database
        await usersModel.updateOne(
          { _id: decoded.id, tokens: refreshToken },
          { $set: { "tokens.$": tokens.refreshToken } }
        );
        return tokens;
      }
    );

    if (tokens) {
      return getResponse({ ctx, result: tokens });
    }

    return ctx.throw(401, "access_denied");
  } catch (err) {
    getBadResponse({ ctx, err });
  }
};
export default updateAccessToken;
