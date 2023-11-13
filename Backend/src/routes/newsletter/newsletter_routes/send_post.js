const ensure_authenticated = require('../../../components/ensure_authenticated.js');
const send_post_schema = require('../../../validation/send_post.js');
const dbm = require('../../../components/database_manager.js');

module.exports = function (app, prisma, http_status) {
    app.post('/send_post', ensure_authenticated,
    (req, res, next) => {
        const {error, resposta} = send_post_schema.validate(req.body); 
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, 
    async (req, res, next) => {
        // verifica se o usuário possui a newsletter
        try {
            let result = dbm.user_have_newsletter(prisma, req.user.username, req.body.id_newsletter);
            
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
    },
    async (req, res, next) => {
        try {
            
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    })
}