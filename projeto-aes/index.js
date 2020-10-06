const { readLinePromise, closeInputReader } = require("../globals");
const crypto = require("crypto");

(async () => {
  const answer = await readLinePromise(
    "Insira uma mensagem para ser criptografada?"
  );

  // generates random iv
  const iv = crypto.randomBytes(16);

  // password
  const password = "secret";

  // generates random salt
  const salt = crypto.randomBytes(16);

  // generates random key based on password
  const key = crypto.scryptSync(password, salt, 16);

  const cipher = crypto.createCipheriv("aes-128-ctr", key, iv);
  const encryptedAnswer = cipher.update(answer, "utf8", "hex");

  console.log(`A mensagem encriptada: ${encryptedAnswer}`);

  closeInputReader();
})();
