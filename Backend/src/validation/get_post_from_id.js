const Joi = require('joi');

module.exports = Joi.object({
    id_post: Joi.number().integer().required()
})