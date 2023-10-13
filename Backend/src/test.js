const http_erros = require('./components/http_status.js');


var {code, message} = http_erros.get_database_error();
console.log(code);
console.log(message);