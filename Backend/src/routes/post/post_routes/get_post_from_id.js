const ensure_authenticated = require('../../../components/ensure_authenticated.js');
const dbm = require('../../../components/database_manager.js');
const get_post_from_id_schema = require('../../../validation/get_post_from_id.js');

module.exports = function (app, prisma, http_status, schedule) {
    app.get('/get_post_from_id', ensure_authenticated, 
    (req, res, next) => {
        const {error, resposta} = get_post_from_id_schema.validate(req.query); 
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        // verifica se o usuário tem o post
        try {
            let response = await dbm.get_user_has_post(prisma, req.user.username, parseInt(req.query.id_post));
            if (response) {
                next();
            } else {
                const {code, message} = http_status.get_user_not_have_this_post();
                res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res, next) => {
        try {
            let post = await dbm.get_post_from_id(prisma, parseInt(req.query.id_post));
            return res.status(200).json(post);
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    })
}