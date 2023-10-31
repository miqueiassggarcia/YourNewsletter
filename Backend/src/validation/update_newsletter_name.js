const Joi = require("joi");

module.exports = Joi.object({
    id: Joi.number().integer().required(),
    new_name: Joi.string().max(30).min(5).required()
})