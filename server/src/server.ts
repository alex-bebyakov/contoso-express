import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as _ from 'lodash';

import config from './config';
import routes from './routes/routes';
import auth from './auth/authInit'
import pathHelper from './helpers/pathHelper'

const app = express();

export default {
    start,
    app
};

function start(options: any) {
    initExpress();
    const passport = require('passport');
    routes.init(app, passport);
    initErrorHandling(app);
    const port=process.env.PORT || config.web.port
    app.listen(port, function () {
        console.log(`Server is listening on port ${port}!`);
    });

}

function initExpress() {
    if (config.app.isDevLocal){
        app.use(morgan('dev'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());
    app.use('/', express.static(pathHelper.getRelative("../client/dist")));

    app.set('view engine', 'ejs');

    if (config.app.isDevLocal) {
        app.use(cors());
    }

    initSession();

    initAuth();
}

function initAuth() {
    const passport = require('passport');
    auth(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    return passport;
}

function initSession() {
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    const session = require('cookie-session');
    app.use(session({
        secret: config.web.sessionSecret
    }));
}


function initErrorHandling(app: express.Application) {
    (app as any).use(function (err, req, res, next) {
        console.log(err);
        let message = _.isError(err) ? err.message : err;
        message = config.app.isDevLocal ? message : 'Server Error';
        res.status(500).send({error: message});
    });
    process.on('uncaughtException', function (err) {
        console.log(err);
    });
}
