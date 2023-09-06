require("dotenv").config();
const randToken = require("rand-token");

console.log(process.env.CONFIRMATION_TOKEN_DICTIONARY);
console.log(randToken.generate(6, process.env.CONFIRMATION_TOKEN_DICTIONARY));