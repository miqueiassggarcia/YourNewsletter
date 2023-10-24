const ensureAuthenticated = require('../components/ensure_authenticated.js');
const create_newsletter_schema = require('../validation/create_newsletter.js');
const newsketters_from_user_schema = require('../validation/newsletters_from_user.js');
const update_newsletter_name_schema = require('../validation/update_newsletter_name.js');
const update_newsletter_description_schema = require('../validation/update_newsletter_description.js');
const delete_newsletter_schema = require('../validation/delete_newsletter.js');


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

    app.get('/newsletters_from_user/:username', ensureAuthenticated, 
    (req, res, next) => {
        const {error, resposta} = newsketters_from_user_schema.validate(req.params.username);
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
                    username: req.params.username
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