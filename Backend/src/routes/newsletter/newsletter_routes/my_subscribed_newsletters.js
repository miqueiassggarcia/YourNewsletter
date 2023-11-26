const ensureAuthenticated = require('../../../components/ensure_authenticated.js');

module.exports = function (app, prisma, http_status) {
    app.get('/my_subscribed_newsletters', ensureAuthenticated,
    async (req, res, next) => {
        try {
            let newsletters = await prisma.newsLetter.findMany({
                where: {
                    newsletter_subscribers: {
                        some: {
                            user_username: req.user.username
                        }
                        
                    }
                }
            });
    
            return res.status(200).json(newsletters);
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            res.status(code).json({"message": message}); 
        }
    });
}