import authControllerInit from '../auth/authController'

export default {
    init: initRoutes
};

function initRoutes(app, passport) {
    initAuthRoutes(app, passport);
}


function initAuthRoutes(app, passport) {
    let authController = authControllerInit(passport);
    app.post('/signup', authController.signUpPost)
    app.post('/login', authController.logInPost)
    app.get('/activate/:token', authController.activate)
}