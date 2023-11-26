const Joi = require('joi');

module.exports = Joi.object({
    id_post: Joi.string().required(),
    scheduling_date: Joi.date().required(),
})