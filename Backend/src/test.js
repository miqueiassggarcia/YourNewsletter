const sendEmail = require("./email_service");

const options = {
    from: "yournewsletteroficial@gmail.com",
    to: "miqueias.lucena@aluno.uepb.edu.br",
    subject: "Esse miqueias é gay",
    text: "gay"
}

sendEmail(options);