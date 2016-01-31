'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var requestLogger = require('express-request-log');
var config = require('../config');
var routes = require('./routes');
var logger = require('../providers/logger');
var db = require('../providers/db');

process.on('uncaughtException', function (exception) {
	logger.error('fatal', exception, exception.stack);
	process.exit(75);
});

logger.info('Starting application...');

var app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(requestLogger(logger, { headers: true, request: true, response: false }));
app.use(bodyParser.json());

app.use(routes);

app.use(function (error, request, response, next) {
	logger.error('application error', error, error.stack);
	response.status(500).json({error: 'internal error'});
});

app.listen(app.get('port'), function () {
	logger.info('application started',
		{ pid: process.pid, port: app.get('port'), environment: config.env }
	);
});
