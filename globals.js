const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLinePromise = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
};

const closeInputReader = () => rl.close();

module.exports = {
  readLinePromise,
  closeInputReader,
};
