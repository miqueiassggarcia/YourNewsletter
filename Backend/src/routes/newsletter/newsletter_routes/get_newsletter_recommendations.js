const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const dbm = require('../../../components/database_manager.js');
const get_newsletter_recommendations_schema = require('../../../validation/get_newsletter_recommendations.js');

module.exports = function (app, prisma, http_status) {
    app.get('/get_newsletter_recommendations', ensureAuthenticated,
    (req, res, next) => {
        const {error, resposta} = get_newsletter_recommendations_schema.validate(req.query); 
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        try {
            let newsletters = await dbm.get_newsletter_recommendations(prisma, parseInt(req.query.max_newsletters), req.user.username);
            return res.status(200).json(newsletters);
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            res.status(code).json({"message": message}); 
        }
    });
}