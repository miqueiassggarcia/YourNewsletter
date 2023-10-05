const Joi = require("joi");

module.exports = Joi.object({
    username: Joi.string()
        .required(),
        
    email: Joi.string()
        .email()
        .required(),

    token_confirmation: Joi.string()
        .required()
});