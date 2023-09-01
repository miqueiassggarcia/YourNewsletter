require('dotenv').config()
const express = require("express");
const app = express();
var bodyParser = require('body-parser')

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



app.use(bodyParser.urlencoded({extended: false}));




app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/cadastrar_usuario", async(req, res) => {
    res.send("cadastrar usuario");
})





app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})