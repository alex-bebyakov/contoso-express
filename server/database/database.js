import config from '../config';
const Sequelize = require('sequelize');
const models = require('./models');

export default {
    init: init
};

function init(connectionOptions) {
    const sequelize = getConnection(connectionOptions);
    const dbModels = models.init(sequelize);

    return {
        sequelize,
        models: dbModels
    };
}

function getConnection(connectionOptions) {
    let options = {
        dialect: 'postgres',
        host: config.db.host,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        //logging: console.log
        logging: false,
    };

    return new Sequelize(config.db.dbName, config.db.username, config.db.password, options);
}