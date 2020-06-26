import CryptoJS from "crypto-js";

export const encodeData = (data: string) => {
  return CryptoJS.AES.encrypt(data, process.env.CRYPTO_JS_SECRET).toString();
};

export const decodeData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTO_JS_SECRET);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
