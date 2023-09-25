const bcrypt = require('bcrypt');

let senha = "euqueromorrer";
let senha2 = "euqueromorrerr";
let hash = bcrypt.hashSync(senha, parseInt('12'));
let hash2 = bcrypt.hashSync(senha, 13);
console.log(bcrypt.compareSync(senha, hash));
console.log(bcrypt.compareSync(senha2, hash2));
