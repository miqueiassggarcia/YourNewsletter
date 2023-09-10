const register_user_schema = require("./validation/register_user.js");
const confirm_user_schema = require("./validation/confirm_user.js");
const sendEmail = require("./email_service");

require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const randToken = require("rand-token");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



app.use(bodyParser.urlencoded({extended: false}));



app.post("/register_user", async(req, res, next) => {
    // verifica se as entradas estão corretas
    const {error, resposta} = register_user_schema.validate(req.body);
    if (error) {
        return res.status(400).json({"message": error.details[0].message});
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

    if (result) {
        return res.status(409).json({"message": "Usuário já cadastrado"});
    } else {
        next();
    }
}, async(req, res) => {
    // cria usuário temporário (ou atualiza caso já exista) na tabela EmailConfirmation
    let random_token = randToken.generate(6, process.env.CONFIRMATION_TOKEN_DICTIONARY)
    let current_date = new Date;
    let token_expiry_time = parseInt(process.env.TOKEN_EXPIRY_TIME);
    let expiry_time = new Date(current_date.getTime() + token_expiry_time * 60000);

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
                    password: req.body.password,
                    token_confirmed: false,
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

        return res.status(200).json({"message": "Usuário esperando confirmação"});
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({"message": "Erro ao cadastrar usuário"});
    }

});


app.post("/confirm_user", async (req, res, next) => {
    // verifica se os campos são válidos
    const {error, resposta} = confirm_user_schema .validate(req.body);
    if (error) {
        return res.status(400).json({"message": error.details[0].message})
    } else {
        next();
    }
}, async (req, res, next) => {
    // verifica se existe no emailConfirmation
    try {
        const email_confirmation = await prisma.emailConfirmation.findFirst({
            where: {
                email: req.body.email
            }
        });
    
        if (!email_confirmation) {
            return res.status(404).json({"message": "Email não cadastrado"});
        } else {
            req.user_email_confirmation = email_confirmation;
            next();
        }
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({"message": "Erro ao acessar banco de dados"});
    }

}, async (req, res, next) => {
    // se são iguais, verifica se o token já se expirou ou se já foi confirmado
    // verifica se já foi confirmado
    if (req.user_email_confirmation.token_confirmed) {
        return res.status(409).json({"message": "Usuário já confirmado"});
    }


    // verifica se o token já se expirou
    let current_date = new Date();
    if (current_date > new Date(req.user_email_confirmation.token_expiry_time)) {
        return res.status(401).json({"message": "Token expirado"});
    }

    // verifica se os tokens são iguais
    if (req.user_email_confirmation.token_confirmation.toString() != req.body.token_confirmation.toString()) {
        return res.status(401).json({"message": "Tokens não coincidem"});
    }

    next();

}, async (req, res) => {
    // tokens tudo nos conformes, cadastra usuário
    try {
        await prisma.user.create({
            data: {
                first_name: req.user_email_confirmation.first_name,
                last_name: req.user_email_confirmation.last_name,
                email: req.user_email_confirmation.email,
                password: req.user_email_confirmation.password
            }
        });

        await prisma.emailConfirmation.update({
            where: {
                email: req.user_email_confirmation.email
            }, 
            data: {
                token_confirmed: true,
                password: ""
            }
        })

        return res.status(200).json({"message": "Email de usuário validado"});
    } catch(erro) {
        console.log(erro);
        return res.status(500).json({"message": "Erro ao confirmar email de usuário"});
    }
})


app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})