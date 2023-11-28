const ensure_authenticated = require('../../../components/ensure_authenticated.js');
const send_post_schema = require('../../../validation/send_post.js');
const dbm = require('../../../components/database_manager.js');

module.exports = function (app, prisma, http_status, schedule) {
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
            let post = await dbm.create_post_newsletter(prisma, 
                req.body.id_newsletter, 
                req.body.scheduling_date, 
                req.body.subject, 
                req.body.style,
                req.body.html);


            if (req.body.send_immediately) {
                await schedule.send_post(post);
                return res.status(200).json({"message": "Post enviado com sucesso"});
            } else if (req.body.send_immediately == false) {

                await schedule.create_schedule(post);
                return res.status(200).json({"message": "Post agendado com sucesso"});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    })
}