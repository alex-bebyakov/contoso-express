import authControllerInit from './authController';
import userRepository from "../repositories/userRepository";

export default initPassport;

function initPassport(passport) {
    authControllerInit(passport);

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userRepository.findUserById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });
}
