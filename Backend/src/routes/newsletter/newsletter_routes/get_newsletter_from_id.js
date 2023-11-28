const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const dbm = require('../../../components/database_manager.js');
const get_newsletter_from_id_schema = require('../../../validation/get_newsletter_from_id.js');

module.exports = function (app, prisma, http_status) {
    app.get('/get_newsletter_from_id', ensureAuthenticated,
    (req, res, next) => {
        const {error, resposta} = get_newsletter_from_id_schema.validate(req.query); 
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        try {
            let newsletter = await dbm.get_newsletter_from_id(prisma, parseInt(req.query.id_newsletter));
            if (newsletter) {
                return res.status(200).json(newsletter);
            } else {
                const {code, message} = http_status.get_newslatter_doesnt_exist();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    })
}