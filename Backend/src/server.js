const register_user_schema = require("./validation/register_user.js");
const sendEmail = require("./email_service");

require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const randToken = require("rand-token");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



app.use(bodyParser.urlencoded({extended: false}));




app.get("/", (req, res) => {
    res.send("Hello World");
});



app.post("/register_user", async(req, res, next) => {
    // verifica se as entradas estão corretas
    const {error, resposta} = register_user_schema.validate(req.body);
    if (error) {
        res.status(400).json({"message": error.details[0].message});
    } else {
        next();
    }
}, async(req, res, next) => {
    // verifica se já existe um usuário cadastrado com o email solicitado
    const result = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    });
    console.log(result);
    if (result) {
        res.status(400).json({"message": "Usuário já cadastrado"});
    } else {
        next();
    }
}, async(req, res) => {
    // cria usuário temporário na tabela EmailConfirmation
    let random_token = randToken.generate(6, process.env.CONFIRMATION_TOKEN_DICTIONARY)
    let current_date = new Date;
    let expiry_time = new Date(current_date.getTime() + 1 * 60000)

    try {
        const email_confirmation = await prisma.emailConfirmation.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (email_confirmation) {
            await prisma.emailConfirmation.update({
                where: {
                    email: req.body.email
                }, 
                data: {
                    token_confirmation: random_token,
                    token_generate_time: current_date,
                    token_expiry_time: expiry_time
                }
            })

        } else {
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
        }



        let email_options = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: "email confirmation",
            text: random_token
        }

        sendEmail(email_options);

        res.status(200).json({"message": "Usuário esperando confirmação"});
    } catch (erro) {
        console.log(erro);
        res.status(500).json({"message": "Erro ao cadastrar usuário"});
    }

});


app.get("/confirm_user", (req, res, next) => {
    res.send("rota desenvolvimento");
})


app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})