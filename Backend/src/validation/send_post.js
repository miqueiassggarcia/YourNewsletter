const Joi = require('joi');

module.exports = Joi.object({
    id_newsletter: Joi.number().integer().required(),
    send_immediately: Joi.bool().required(),
    scheduling_date: Joi.date(),
    subject: Joi.string().required(),
    html: Joi.string().required()
});