const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const check_newsletter_subscription_schema = require('../../../validation/check_newsletter_subscription.js');

module.exports = function (app, prisma, http_status) {
    app.get('/check_newsletter_subscription', ensureAuthenticated,
    (req, res, next) => {
        const {error} = check_newsletter_subscription_schema.validate(req.query);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    },
    async (req, res) => {
        try {
            let subscription = await prisma.newsletterSubscribers.findFirst({
                where: {
                    user_username: req.user.username,
                    id_newsletter: parseInt(req.query.id_newsletter)
                }
            })
    
            return res.status(200).json({"message": subscription != null});
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            res.status(code).json({"message": message}); 
        }
    })
}