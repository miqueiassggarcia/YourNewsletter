const ensureAuthenticated = require('../components/ensure_authenticated.js');
const create_newsletter_schema = require('../validation/create_newsletter.js');
const newsketters_from_user_schema = require('../validation/newsletters_from_user.js');

module.exports = function (app, prisma) {
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
            return res.status(500).json({"message": "Erro ao cadastrar newsletter"});
        }
    });


    app.get('/newsletters_from_user', (req, res, next) => {
        const {error, resposta} = newsketters_from_user_schema.validate(req.body);
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
                    username: req.body.username
                },
                include: {
                    newsletters: true
                }
            });
            if (n) {
                newsletters = n.newsletters;
            }
            res.status(200).json(newsletters);
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": "Erro ao buscar newsletters"});
        }
    })
}