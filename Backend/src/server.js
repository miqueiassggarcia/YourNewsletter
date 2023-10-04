require('dotenv').config()
const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');

const router_register = require('./routes/register.js');
const router_login = require('./routes/login.js');
const router_newsletter = require('./routes/newsletter.js');
const auth = require('./auth.js');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


// rotas
router_register(app, prisma);
router_login(app, prisma);
router_newsletter(app, prisma);
auth(app, prisma);



app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})