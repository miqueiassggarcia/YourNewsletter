const ensureAuthenticated = require('../components/ensure_authenticated.js');
const create_newsletter_schema = require('../validation/create_newsletter.js');
const newsletter_search_schema = require('../validation/newsletters_search.js');
const newsletter_search_user_schema = require('../validation/newsletter_from_user.js');
const update_newsletter_name_schema = require('../validation/update_newsletter_name.js');
const update_newsletter_description_schema = require('../validation/update_newsletter_description.js');
const delete_newsletter_schema = require('../validation/delete_newsletter.js');
const newsletter_subscribe_schema = require('../validation/newsletter_subscribe.js');
const check_newsletter_subscription_schema = require('../validation/check_newsletter_subscription.js');

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

    app.get('/newsletters_from_user', ensureAuthenticated, 
    (req, res, next) => {
        const {error, resposta} = newsletter_search_user_schema.validate(req.query);
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
                    username: req.query.username
                },
                include: {
                    newsletters: true
                }
            });
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

    app.put('/update_newsletter_name', ensureAuthenticated, 
    (req, res, next) => {
        const {error, resposta} = update_newsletter_name_schema.validate(req.body);
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
                                    name: req.body.new_name
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


    app.post('/newsletter_subscribe', ensureAuthenticated,
    (req, res, next) => {
        const {error} = newsletter_subscribe_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        // verifica se essa newsletter existe
        try {
            let n = await prisma.newsLetter.findUnique({
                where: {
                    id: req.body.id_newsletter
                }
            });

            if (n) {
                next();
            } else {
                const {code, message} = http_status.get_newslatter_doesnt_exist();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res, next) => {
        // verifica se o usuário já esta inscrito nessa newsletter
        try {
            let un = await prisma.newsletterSubscribers.findFirst({
                where: {
                    user_username: req.user.username,
                    id_newsletter: req.body.id_newsletter
                }
            });

            if (!un) {
                next();
            } else {
                const {code, message} = http_status.get_user_already_subscribed_newsletter();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res) => {
        try {
            await prisma.newsletterSubscribers.create({
                data: {
                    id_newsletter: req.body.id_newsletter, 
                    user_username: req.user.username
                }
            });

            const {code, message} = http_status.get_user_subscribed_newsletter();
            return res.status(code).json({"message": message});
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        } 
    });

    app.post('/newsletter_unsubscribe', ensureAuthenticated,
    (req, res, next) => {
        const {error} = newsletter_subscribe_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async (req, res, next) => {
        // verifica se essa newsletter existe
        try {
            let n = await prisma.newsLetter.findUnique({
                where: {
                    id: req.body.id_newsletter
                }
            });

            if (n) {
                next();
            } else {
                const {code, message} = http_status.get_newslatter_doesnt_exist();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res, next) => {
        // verifica se o usuário esta inscrito nessa newsletter
        try {
            let un = await prisma.newsletterSubscribers.findFirst({
                where: {
                    id_newsletter: req.body.id_newsletter,
                    user_username: req.user.username,
                }
            });

            if (un) {
                next();
            } else {
                const {code, message} = http_status.get_user_dont_subscribed_newsletter();
                return res.status(code).json({"message": message});
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        }
    }, async (req, res) => {
        try {
            const deletedSubscriber = await prisma.newsletterSubscribers.deleteMany({
                where: {
                    AND: [
                      { user_username: req.user.username },
                      { id_newsletter: req.body.id_newsletter },
                    ],
                  }
            });

            if (deletedSubscriber.count == 1) {
                const {code, message} = http_status.get_user_unsubscribe_newsletter();
                return res.status(code).json({"message": message});
            } else if (count == 0) {
                return console.log("Nenhum usuário foi removido");
            }
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            return res.status(code).json({"message": message});
        } 
    });

    
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


    app.get('/check_newsletter_subscription', ensureAuthenticated,
    (req, res, next) => {
        const {error} = check_newsletter_subscription_schema.validate(req.query);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    },
    async (req, res) => {
        try {
            let subscription = await prisma.newsletterSubscribers.findFirst({
                where: {
                    user_username: req.user.username,
                    id_newsletter: parseInt(req.query.id_newsletter)
                }
            })
    
            return res.status(200).json({"message": subscription != null});
        } catch (error) {
            console.log(error);
            const {code, message} = http_status.get_database_error();
            res.status(code).json({"message": message}); 
        }
    })
}