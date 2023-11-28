const Joi = require('joi');

module.exports = Joi.object({
    max_newsletters: Joi.number().integer().min(0).max(100).required()
})