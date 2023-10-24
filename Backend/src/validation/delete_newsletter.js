const Joi = require('joi');

module.exports = Joi.object({
    id: Joi.number().integer().required()
})