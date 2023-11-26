const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const newsletter_search_schema = require('../../../validation/newsletters_search.js');

module.exports = function (app, prisma, http_status) {
    app.get('/newsletter_search', ensureAuthenticated,
    (req, res, next) => {
        // verifica se as entradas estão corretas
        const {error, resposta} = newsletter_search_schema.validate(req.query);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res) => {
        try {
            let newsletters = await prisma.newsLetter.findMany({
                where: {
                    OR: [{
                        name: {
                            contains: req.query.search_query,
                            mode: 'insensitive'
                        }
                    }, {
                        userUsername: {
                            contains: req.query.search_query,
                            mode: 'insensitive'
                        }
                    }, {
                        description: {
                            contains: req.query.search_query,
                            mode: 'insensitive'
                        }
                    }]
                }
            });
    
            return res.status(200).json(newsletters);
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    });
}