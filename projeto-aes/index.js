const readline = require("readline");
const crypto = require("crypto");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Insira uma mensagem para ser criptografada? ", (answer) => {
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

  rl.close();
});
