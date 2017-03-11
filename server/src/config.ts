import pathHelper from './helpers/pathHelper';

import {IConfigValues} from '../index'

let configValues = <IConfigValues>{};

ensureConfigPath();

const configReader = require('config');

loadConfig();

export function loadConfig() {

    (<any>configValues).app = {};
    configValues.app.appName = get('app.appName');
    configValues.app.isDevLocal = get('app.isDevLocal');
    configValues.app.logErrors = get('app.logErrors');
    configValues.app.rootUrl = get('app.rootUrl');

    (<any>configValues).email = {};
    configValues.email.auth = get('email.auth');
    configValues.email.host = get('email.host');
    configValues.email.port = get('email.port');
    configValues.email.secure = get('email.secure');


    (<any>configValues).web = {};
    configValues.web.port = get('web.port');
    configValues.web.sessionSecret = get('web.sessionSecret');

    (<any>configValues).db = {};
    configValues.db.host = get('db.host');

    (<any>configValues).format = {};
    configValues.format.date = get('format.date');
    configValues.format.year = get('format.year');
    configValues.format.currencySymbol = get('format.currencySymbol');

    (<any>configValues).resource ="";
    configValues.resource=get('resource');
}

function get(key) {
    return configReader.get(key);
}

function ensureConfigPath() {
    if (!process.env['NODE_CONFIG_DIR']) {
        let configPath = pathHelper.getRelative('');
        console.log(configPath)
        process.env['NODE_CONFIG_DIR'] = configPath;
    }
}

export default configValues;