import pathHelper from './helpers/pathHelper';

let configValues = {};

ensureConfigPath();

const configReader = require('config');

loadConfig();

export function getClientConfig() {
    return {
        isDevLocal: configValues.app.isDevLocal,
        dateFormat: configValues.format.date,
        yearFormat: configValues.format.year,
        currencySymbol: configValues.format.currencySymbol
    };
}

export function loadConfig() {

    configValues.app = {};
    configValues.app.appName = get('app.appName');
    configValues.app.isDevLocal = get('app.isDevLocal');
    configValues.app.logErrors = get('app.logErrors');
    configValues.app.rootUrl = get('app.rootUrl');

    configValues.db = {};
    configValues.db.host = get('db.host');
    configValues.db.dbName = get('db.dbName');
    configValues.db.username = get('db.username');
    configValues.db.password = get('db.password');

    configValues.web = {};
    configValues.web.port = get('web.port');
    configValues.web.sessionSecret = get('web.sessionSecret');

    configValues.email = {};
    configValues.email.fromNoReply = get('email.fromNoReply');

    configValues.auth = {};
    configValues.auth.useAuth = get('auth.useAuth');

    configValues.auth.google = {};
    configValues.auth.google.clientID = get('auth.google.clientID');
    configValues.auth.google.clientSecret = get('auth.google.clientSecret');

    configValues.auth.facebook = {};
    configValues.auth.facebook.clientID = get('auth.facebook.clientID');
    configValues.auth.facebook.clientSecret = get('auth.facebook.clientSecret');

    configValues.format = {};
    configValues.format.date = get('format.date');
    configValues.format.year = get('format.year');
    configValues.format.currencySymbol = get('format.currencySymbol');
}

function get(key) {
    return configReader.get(key);
}

function ensureConfigPath() {
    if (!process.env['NODE_CONFIG_DIR']) {
        let configPath = pathHelper.getDataRelative('config');
        process.env['NODE_CONFIG_DIR'] = configPath;
    }
}

export default configValues;