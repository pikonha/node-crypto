const salt = CryptoJS.lib.WordArray.random(16);

function generateKey(password) {
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 4,
  }).toString();

  return key;
}

async function encode(value, key) {
  return await aes4js.encrypt(key, value);
}

async function decode(value, key) {
  return await aes4js.decrypt(key, value);
}

function bindEvents() {
  const pwdInput = document.querySelector("#pwd-input");
  const cypherInput = document.querySelector("#cypher-input");
  const decypherInput = document.querySelector("#decypher-input");
  const cypherButton = document.querySelector("#cypher-button");
  const decypherButton = document.querySelector("#decypher-button");
  const contentOutput = document.querySelector("#content-output");

  cypherButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputValue = cypherInput.value;

    if (!inputValue || !pwdInput.value) return;

    const key = generateKey(pwdInput.value);

    const encrypted = await encode(inputValue, key);

    contentOutput.value = JSON.stringify(encrypted);
  });

  decypherButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputValue = decypherInput.value;

    if (!inputValue || !pwdInput.value) return;

    const key = generateKey(pwdInput.value);

    try {
      const decrypted = await decode(inputValue, key);
      contentOutput.value = decrypted;
    } catch (error) {
      pwdInput.focus();
      const span = document.createElement("span");
      span.className = "error";
      span.appendChild(document.createTextNode("Senha incorreta"));
      pwdInput.parentNode.appendChild(span);
    }
  });
}

(() => {
  bindEvents();
})();
