const cryptoJs = require("crypto-js");
const crypto = require("crypto");
const { readLinePromise, closeInputReader } = require("../globals");

function decrypt(text, key, iv, mode, padding) {
  const bufferKey = Buffer.from(key, "hex");
  const bufferIv = Buffer.from(iv, "hex");

  const decypher = crypto.createDecipheriv(mode, bufferKey, bufferIv);
  const decrypted = decypher.update(text, "hex") + decypher.final();
  return decrypted.toString();
}

(async () => {
  const cbcKey = "53efb4b1157fccdb9902676329debc52";
  const cbcIv = "d161fbaa4c64ecf7d2c4abd885751273";
  const cbcText =
    "701f7fa45d9bb922c3cb15a519ba40ede1769eb753650886d6e69ebcad9c2816002679896a65a921d25e00793078474e3dbeca9a2838031c490e5ae9d1ea143f";

  const cbcMessageDecrypted = decrypt(cbcText, cbcKey, cbcIv, "aes-128-cbc");

  console.log("CBC", cbcMessageDecrypted);

  closeInputReader();
})();
