const ensureAuthenticated = require('../../../components/ensure_authenticated.js');

module.exports = function (app, prisma, http_status) {
    app.get('/get_my_newsletters', ensureAuthenticated,
    async (req, res, next) => {
        try {
            let newsletters = [];

            const n = await prisma.user.findUnique({
                select: {
                    newsletters: true
                },
                where: {
                    username: req.user.username
                }
            })

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