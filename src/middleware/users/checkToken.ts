import jwt from "jsonwebtoken";

const checkAccessToken = async (ctx, next) => {
  try {
    const token = ctx.headers["authorization"];
    if (token === null) {
      ctx.throw(401, "access_denied");
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    ctx.userId = user.id;
    return next();
  } catch (err) {
    return ctx.throw(401, "access_denied");
  }
};
export default checkAccessToken;
