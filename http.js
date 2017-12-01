#!/usr/bin/env node

const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const debug = require('debug');
let router = express.Router();

router.get('*', function(req, res) {
    console.log('Requested '+req.path+' from '+req.connection.remoteAddress);
    return res.send('weia\n')
});

let app = express();
app.use(router);

app.set('port', 53);

let server = http.createServer(app);
server.listen(80);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}