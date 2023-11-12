require('dotenv').config();
const sendEmail = require("./email_service");
const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, './htmltest.html');
const source = fs.readFileSync(filePath, 'utf-8').toString();

let email_options = {
    from: process.env.EMAIL_USER,
    to: "fabiooliveira2091@gmail.com",
    subject: "email confirmation",
    text: "hello",
    html: source
}
sendEmail(email_options);