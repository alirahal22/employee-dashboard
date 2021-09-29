/** Performs RSA public key encryption to string payload */
export const rsaEncrypt = (key: string, clearText: string): string => {
  const CryptoJs = require("hybrid-crypto-js");
  const crypt = new CryptoJs.Crypt();
  return crypt.encrypt(key, clearText);
};
