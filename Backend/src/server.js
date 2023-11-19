require('dotenv').config()
const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router_register = require('./routes/register.js');
const router_login = require('./routes/login.js');
const router_newsletter = require('./routes/newsletter.js');
const auth = require('./auth.js');

const http_status = require('./components/http_status.js');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// let whitelist = process.env.WHITELIST.split(" ")
let corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    return callback(null, true);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}

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
app.use(cors(corsOptions));
app.use(cookieParser());

// rotas
router_register(app, prisma, http_status);
router_login(app, prisma, http_status);
router_newsletter(app, prisma, http_status);
auth(app, prisma, http_status);



app.listen(process.env.PORT, () => {
    console.log("servidor rodando na porta " + process.env.PORT.toString());
})