import UsersModel from "../../models/users";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { getResponse, getBadResponse } from "../../utils";
import { JWT_SECRET } from "../../constant";
import CryptoJS from "crypto-js";

const auth = async (ctx: any) => {
  try {
    const { token } = ctx.request.body;
    const { email, password } = jwt.verify(token, "TODO_LIST");

    const encodePassword = CryptoJS.AES.encrypt(
      "my message",
      "secret key 123"
    ).toString();

    // var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);

    // console.log(originalText, "originalText");

    // const user = await UsersModel.findOne({ email, password });
    // const user = null;
    // if (user === null) {
    //   throw new Error();
    // }
    const refreshToken = uuid();
    const result = {
      token: jwt.sign(
        { refreshToken: uuid(), access_token: uuid() },
        "TODO_LIST",
        {
          expiresIn: "1h",
        }
      ),
    };
    console.log(result, "result");

    return getResponse({ ctx, result });
  } catch (err) {
    return getBadResponse({
      ctx,
      err,
      message:
        "User does not exist or you probably entered the wrong email or password",
    });
  }
};
export default auth;
