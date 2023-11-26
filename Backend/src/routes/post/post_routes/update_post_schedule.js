const ensure_authenticated = require('../../../components/ensure_authenticated.js');
const dbm = require('../../../components/database_manager.js');
const update_post_schedule_schema = require('../../../validation/update_post_schedula.js');

module.exports = function (app, prisma, http_status, schedule) {
    app.put('/update_post_schedule', ensure_authenticated,
    (req, res, next) => {
        const {error, resposta} = update_post_schedule_schema.validate(req.body); 
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        // verifica se o usuário tem esse post
        try {
            let result = await dbm.get_user_has_post(prisma, req.user.username, parseInt(req.body.id_post));
            if (result) {
                next();
            } else {
                const {code, message} = http_status.get_user_not_have_this_post();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    })
}