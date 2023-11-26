const ensureAuthenticated = require('../../../components/ensure_authenticated.js');
const update_newsletter_description_schema = require('../../../validation/update_newsletter_description.js');


module.exports = function (app, prisma, http_status) {
    app.put('/update_newsletter_description', ensureAuthenticated,
    (req, res, next) => {
        const {error} = update_newsletter_description_schema.validate(req.body);
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
    
            if (newsletter.newsletters.length > 0) {
                await prisma.user.update({
                    where: {
                        username: req.user.username
                    },
                    data: {
                        newsletters: {
                            update: {
                                where: {
                                    id: req.body.id
                                }, 
                                data: {
                                    description: req.body.new_description
                                }
                            }
                        }
                    },
                    include: {
                        newsletters: true
                    }
                })
            } else {
                const {code, message} = http_status.get_user_not_have_this_newsletter();
                return res.status(code).json({"message": message});
            }
    
            const {code, message} = http_status.get_newslatter_updated();
            return res.status(code).json({"messsage": message});
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    });
}