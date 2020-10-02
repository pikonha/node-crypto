const readline = require("readline");
const crypto = require("crypto");
const cryptoJs = require("crypto-js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLinePromise = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
};

function decrypt(text, key, iv, mode, padding) {
  // const decipher = crypto.createDecipheriv(mode, key, iv);
  // return decipher.update(text, "utf8", "hex");

  // const hexKey = cryptoJs.enc.Hex.parse(key);
  // const hexIV = cryptoJs.enc.Hex.parse(iv);

  return cryptoJs.AES.decrypt(text, key, {
    iv,
    mode,
    padding,
  }).toString();
}

(async () => {
  const cbcKey = "53efb4b1157fccdb9902676329debc52";
  const cbcIv = "d161fbaa4c64ecf7d2c4abd885751273";
  const cbcText =
    "701f7fa45d9bb922c3cb15a519ba40ede1769eb753650886d6e69ebcad9c2816002679896a65a921d25e00793078474e3dbeca9a2838031c490e5ae9d1ea143f";

  const cbcMessageDecrypted = decrypt(
    cbcText,
    cbcKey,
    cbcIv,
    cryptoJs.mode.CBC,
    cryptoJs.pad.Pkcs7
  );

  console.log("CBC", cbcMessageDecrypted);

  // const cbcIv = await readLinePromise("Insira o IV?");
  // const cbcKey = await readLinePromise("Insira a chave?");
  // const cbcText = await readLinePromise("Insira o texto em cifrado com CBC?");

  // const ctrIv = await readLinePromise("Insira o IV: ");
  // const ctrKey = await readLinePromise("Insira a chave: ");
  // const ctrText = await readLinePromise("Insira o texto em cifrado com CTR: ");
  const ctrIv = "468ce1126a37b07138e78eab48344712";
  const ctrKey = "a05e2679204241af07f6857d150a1fcd";
  const ctrText =
    "36466b5fddcfcb1b8a9479eb8c489e7139a3c35020b1e5ee808b39ff18b6abd812afe7dbbca40e15df391a7c07ece1c8e10a49368b86a946c8379cd8fa01a47f1956671144b0ca18a4c812cde8f7b9";

  const ctrMessageDecrypted = decrypt(
    ctrText,
    ctrKey,
    ctrIv,
    cryptoJs.mode.CTR,
    cryptoJs.pad.ZeroPadding
  );

  console.log("CTR", ctrMessageDecrypted);

  rl.close();
})();
