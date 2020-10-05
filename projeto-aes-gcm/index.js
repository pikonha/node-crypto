const crypto = require("crypto");
const cryptojs = require("crypto-js");
const { readLinePromise, closeInputReader } = require("../globals");

const PASSWORD = "passsssword";

function encrypt(str) {
  const iv = crypto.randomBytes(16);

  const salt = cryptojs.lib.WordArray.random(128 / 8);
  const key = cryptojs.PBKDF2(PASSWORD, salt, {
    keySize: 128 / 32,
  });

  const cipher = crypto.createCipheriv("aes-256-gcm", key.toString(), iv);
  let crypt = cipher.update(str, "utf8", "base64");
  crypt += cipher.final("base64");
  return crypt;
}

(async () => {
  const input = await readLinePromise("Digite uma frase: ");
  const encrypted = encrypt(input);

  console.log("encrypted", encrypted);

  closeInputReader();
})();
