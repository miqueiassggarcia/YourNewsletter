const register_user_schema = require("./validation/register_user.js");

require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



app.use(bodyParser.urlencoded({extended: false}));




app.get("/", (req, res) => {
    res.send("Hello World");
});



app.post("/register_user", async(req, res, next) => {
    const {error, resposta} = register_user_schema.validate(req.body);
    if (error) {
        res.status(400).json({"message": error.details[0].message});
    } else {
        next();
    }
}, async(req, res, next) => {
    const result = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    });
    if (result) {
        res.status(400).json({"message": "Usuário já cadastrado"});
    } else {
        next();
    }
}, async(req, res, next) => {
    let random_token = (Math.random() * (999999 - 100000) + 100000).toString();
    let current_date = new Date;

    try {
        await prisma.emailConfirmation.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                token_confirmation: random_token,
                token_generate_time: current_date,
                token_expiry_time: new Date(current_date.getTime() + 1 * 60000)
            }
        })

        let email_options = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: "email confirmation",
            text: random_token
        }

        transporter.sendMail(email_options, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).json({"message": "erro ao enviar email"});
            } else {
                res.status(200).json({"message": "Tudo ok, Esperando confirmação"})
            }
        });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({"message": "Erro ao cadastrar usuário"});
    }

});


app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})