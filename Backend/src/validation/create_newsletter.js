const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string()
        .max(30)
        .min(5)
        .required(),
    
    description: Joi.string()
        .max(200)
        .min(5)
        .required()
})