const Joi = require("joi");

module.exports = Joi.object({
    username: Joi.string()
        .min(6)
        .max(20)
        .required(),
        
    first_name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(5)
        .max(100)
        .required()
})
