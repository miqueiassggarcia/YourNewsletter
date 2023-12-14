const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const create_newsletter_schema = require('../../../validation/create_newsletter.js');

module.exports = function (app, prisma, http_status) {
    app.post('/create_newsletter', ensureAuthenticated,
    (req, res, next) => {
        // verifica se as entradas estão corretas
        const {error, resposta} = create_newsletter_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async(req, res, next) => {
        try {
            await prisma.user.update({
                where: {
                    username: req.user.username
                },
                data: {
                    newsletters: {
                        create: {
                            name: req.body.name,
                            description: req.body.description
                        }
                    }
                }
            });

            return res.status(200).json({"message": "Newsletter criada com sucesso"});
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    });
}