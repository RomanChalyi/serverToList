import CryptoJS from "crypto-js";
import { CRYPTO_JS_SECRET } from "../constant";

export const encodeData = (data: string) => {
  return CryptoJS.AES.encrypt(data, CRYPTO_JS_SECRET).toString();
};

export const decodeData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, CRYPTO_JS_SECRET);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
