const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const newsletter_subscribe_schema = require('../../../validation/newsletter_subscribe.js');

module.exports = function (app, prisma, http_status) {
    app.post('/newsletter_subscribe', ensureAuthenticated,
    (req, res, next) => {
        const {error} = newsletter_subscribe_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        // verifica se essa newsletter existe
        try {
            let n = await prisma.newsLetter.findUnique({
                where: {
                    id: req.body.id_newsletter
                }
            });

            if (n) {
                next();
            } else {
                const {code, message} = http_status.get_newslatter_doesnt_exist();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res, next) => {
        // verifica se o usuário já esta inscrito nessa newsletter
        try {
            let un = await prisma.newsletterSubscribers.findFirst({
                where: {
                    user_username: req.user.username,
                    id_newsletter: req.body.id_newsletter
                }
            });

            if (!un) {
                next();
            } else {
                const {code, message} = http_status.get_user_already_subscribed_newsletter();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res) => {
        try {
            await prisma.newsletterSubscribers.create({
                data: {
                    id_newsletter: req.body.id_newsletter, 
                    user_username: req.user.username
                }
            });

            const {code, message} = http_status.get_user_subscribed_newsletter();
            return res.status(code).json({"message": message});
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        } 
    });
}