function getSalt() {
  const salt = localStorage.getItem("salt");

  if (!salt) return CryptoJS.lib.WordArray.random(16);

  return salt;
}

function generateKey(password, salt) {
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

async function sha256(str) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(str)
  );
  return Array.from(new Uint8Array(hash))
    .map((bin) => ("00" + bin.toString(16)).slice(-2))
    .join("");
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

    const salt = await getSalt();
    localStorage.setItem("salt", salt);

    const key = generateKey(pwdInput.value, salt);

    const encrypted = await encode(inputValue, key);

    contentOutput.value = JSON.stringify(encrypted);

    hideErrorWarning();
  });

  decypherButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputValue = decypherInput.value;

    if (!inputValue || !pwdInput.value) return;

    const salt = await getSalt();
    const key = generateKey(pwdInput.value, salt);

    try {
      const decrypted = await decode(inputValue, key);
      contentOutput.value = decrypted;
    } catch (error) {
      pwdInput.focus();
      showErrorWarning();
    }
  });
}

function showErrorWarning() {
  const span = document.querySelector("span.error");
  span.style.visibility = "visible";
}

function hideErrorWarning() {
  const span = document.querySelector("span.error");
  span.style.display = "none";
}

(() => {
  bindEvents();
})();
