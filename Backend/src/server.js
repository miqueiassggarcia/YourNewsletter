require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())


const router_register = require('./routes/register.js');


router_register(app, prisma);


app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})