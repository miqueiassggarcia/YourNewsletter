const ensure_authenticated = require('../../../components/ensure_authenticated.js');
const get_posts_from_newsletter_schema = require('../../../validation/get_posts_from_newsletter.js');
const dbm = require('../../../components/database_manager.js');

module.exports = function (app, prisma, http_status, schedule) {
    app.get('/get_posts_from_newsletter', ensure_authenticated,
    (req, res, next) => {
        const {error, resposta} = get_posts_from_newsletter_schema.validate(req.query); 
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        // verifica se o usuário tem essa newsletter
        try {
            var result = await dbm.user_have_newsletter(prisma, req.user.username, parseInt(req.query.id_newsletter));

            if (result) {
                next();
            } else {
                const {code, message} = http_status.get_user_not_have_this_newsletter();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res, next) => {
        try {
            let posts = await dbm.get_posts_from_newsletter(prisma, req.body.id_newsletter);
            return res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(200).json({"message": message});
        }
    }); 
}