const ck = require("@chilkat/ck-node12-linux64");
const readline = require("readline");
const crypto = require("crypto");

const crypt = new ck.Crypt2();

const password = "secret";

const CryptAlgorithm = "aes";
const CipherMode = "ctr";
const KeyLength = 256;
const EncodingMode = "hex";

// generates random salt
const salt = crypto.randomBytes(16);

// generates random iv
const iv = crypto.randomBytes(16);

// generates random key based on password
const key = crypto.scryptSync(password, salt, 16);

crypt.CryptAlgorithm = CryptAlgorithm;
crypt.CipherMode = CipherMode;
crypt.KeyLength = KeyLength;
crypt.EncodingMode = EncodingMode;

crypt.SetEncodedIV(iv, "hex");
crypt.SetEncodedKey(key, "hex");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Insira uma mensagem para ser criptografada? ", (answer) => {
  const encStr = crypt.EncryptStringENC(answer);

  const decrypt = new ck.Crypt2();

  decrypt.CryptAlgorithm = CryptAlgorithm;
  decrypt.CipherMode = CipherMode;
  decrypt.KeyLength = KeyLength;
  decrypt.EncodingMode = EncodingMode;
  decrypt.SetEncodedIV(iv, "hex");
  decrypt.SetEncodedKey(key, "hex");

  // Now decrypt:
  const decStr = decrypt.DecryptStringENC(encStr);

  console.log(`A mensagem encriptada: ${encStr}`);
  console.log(`A mensagem descriptograda : ${decStr}`);

  rl.close();
});
