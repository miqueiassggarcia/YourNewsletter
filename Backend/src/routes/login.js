const passport = require('passport');

const login_user_schema = require('../validation/login_user.js');

module.exports = function (app, prisma) {
    app.post("/login", async (req, res, next) => {
        // verifica se as entradas estão corretas
        const {error, response} = login_user_schema.validate(req.body);
        if (error) {
            return res.status(400).json({"message": error.details[0].message});
        } else {
            next();
        }
    }, async(req, res, next) => {
        passport.authenticate('local', function(err, user, info, status) {
            if (err) return res.status(401).json({"message": "erro ao autenticar usuário"});
            if (!user) return res.status(404).json({"message": "usuário não cadastrado"});
            req.logIn(user, (err) => {
                if (err) throw err;
                next();
            })
        })(req, res, next);
    }, 
    (req, res) => {
        return res.status(200).json({
            username: req.user.username,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email
        });
    });


    app.get("/logout", (req, res) => {
        req.logout((err) => {
            if (err) return res.status(401).json({"message": "erro ao deslogar usuário"});
            return res.status(200).json({"message": "usuário deslogado com sucesso"});
        });
    })

}