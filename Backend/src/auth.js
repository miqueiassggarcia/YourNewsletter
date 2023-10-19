const passport = require('passport');
const LocalStrategy = require('passport-local');

const bcrypt = require('bcrypt');

module.exports = function (app, prisma, http_status) {
    passport.use(new LocalStrategy(async(username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            });
    
            if (!user) return done(null, false);
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false)
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
    
    passport.deserializeUser(async (username, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            });
            done(null, user);
        } catch (error) {
            console.log(error);
        }
    })
}