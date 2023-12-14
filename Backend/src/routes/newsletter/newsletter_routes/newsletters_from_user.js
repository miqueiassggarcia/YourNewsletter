const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const newsletter_search_user_schema = require('../../../validation/newsletter_from_user.js');

module.exports = function (app, prisma, http_status) {
    app.get('/newsletters_from_user', ensureAuthenticated, 
    (req, res, next) => {
        const {error, resposta} = newsletter_search_user_schema.validate(req.query);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async(req, res, next) => {
        try {
            let newsletters = [];
            let n = await prisma.user.findUnique({
                where: {
                    username: req.query.username
                },
                include: {
                    newsletters: true
                }
            });
            if (n) {
                newsletters = n.newsletters;
            }
            return res.status(200).json(newsletters);
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    });
}