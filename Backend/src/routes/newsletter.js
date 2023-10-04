const ensureAuthenticated = require('../components/auth_middleware.js');
const create_newsletter_schema = require('../validation/create_newsletter.js');

module.exports = function (app, prisma) {
    app.post('/create_newsletter', ensureAuthenticated,
    (req, res, next) => {
        // verifica se as entradas estão corretas
        const {error, resposta} = create_newsletter_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            return next();
        }
    }, async(req, res, next) => {
        try {
            await prisma.newsletter.create({
                data: {
                    username: req.user.username,
                    name: req.body.name,
                    description: req.body.description
                }
            });

            return res.status(200).json({"message": "Newsletter criada com sucesso"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": "Erro ao cadastrar newsletter"});
        }
    })
}