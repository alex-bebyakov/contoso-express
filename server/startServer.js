process.on('uncaughtException', function (err) {
    let stack = err.stack;
    console.log(`Uncaught exception. ${err}`);
});

process.on('unhandledRejection', function (err) {
    console.log(err);
});

import server from './server';

server.start({});