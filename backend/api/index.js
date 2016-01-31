'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var requestLog = require('express-request-log');
var config = require('../config');
var routes = require('./routes');
var log = require('../providers/log');

process.on('uncaughtException', function (exception) {
	log.error('fatal', exception, exception.stack);
	process.exit(75);
});

log.info('Starting application...');

var app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(requestLog(log, { headers: true, request: true, response: false }));
app.use(bodyParser.json());

app.use(routes);

app.use(function (error, request, response, next) {
	log.error('application error', error, error.stack);
	response.status(500).json({error: 'internal error'});
});

app.listen(app.get('port'), function () {
	log.info('application started',
		{ pid: process.pid, port: app.get('port'), environment: config.env }
	);
});
