const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const delete_newsletter_schema = require('../../../validation/delete_newsletter.js');

module.exports = function (app, prisma, http_status) {
    app.delete("/delete_newsletter", ensureAuthenticated,
    (req, res, next) => {
        const {error} = delete_newsletter_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async(req, res, next) => {
        try {
            let newsletter = await prisma.user.findUnique({
                where: {
                    username: req.user.username
                },
                select: {
                    newsletters: {
                        where: {
                            id: req.body.id
                        }
                    }
                }
            });

            if(newsletter.newsletters.length > 0) {
                // deleta todas as inscrições da newsletter
                await prisma.newsletterSubscribers.deleteMany({
                    where: {
                        AND: [
                          { id_newsletter: req.body.id}
                        ],
                      }
                });


                // deleta a newsletter
                await prisma.user.update({
                    where: {
                        username: req.user.username
                    },
                    data: {
                        newsletters: {
                            deleteMany: {
                                id: req.body.id
                            }
                        }
                    },
                    include: {
                        newsletters: true
                    }
                });
            } else {
                const {code, message} = http_status.get_user_not_have_this_newsletter();
                return res.status(code).json({"message": message});
            }

            const {code, message} = http_status.get_newsletter_deleted();
            return res.status(code).json({"message": message});
        } catch(error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    });
}