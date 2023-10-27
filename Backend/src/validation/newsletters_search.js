const Joi = require('joi');

module.exports = Joi.object({
    search_query: Joi.string().min(1).required()
})