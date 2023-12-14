const Joi = require('joi');

module.exports = Joi.object({
    id_newsletter: Joi.number().integer().required()
})