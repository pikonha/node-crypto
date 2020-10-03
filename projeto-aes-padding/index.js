const crypto = require("crypto");

function decryptCrypto(text, key, iv, mode) {
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

  const cbcMessageDecrypted = decryptCrypto(
    cbcText,
    cbcKey,
    cbcIv,
    "aes-128-cbc"
  );

  const ctrKey = "a05e2679204241af07f6857d150a1fcd";
  const ctrIv = "468ce1126a37b07138e78eab48344712";
  const ctrText =
    "36466b5fddcfcb1b8a9479eb8c489e7139a3c35020b1e5ee808b39ff18b6abd812afe7dbbca40e15df391a7c07ece1c8e10a49368b86a946c8379cd8fa01a47f1956671144b0ca18a4c812cde8f7b9";

  const ctrMessageDecrypted = decryptCrypto(
    ctrText,
    ctrKey,
    ctrIv,
    "aes-128-ctr"
  );

  console.log("CBC", cbcMessageDecrypted);
  console.log("CTR", ctrMessageDecrypted);
})();
