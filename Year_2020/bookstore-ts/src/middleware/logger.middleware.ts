'use strict';

import * as chalk from 'chalk';
import * as morgan from 'morgan';

export const morganLogger = morgan(function (tokens, req, res) {

    return chalk.magenta.bold([
        new Date().toISOString(), '::',
        'Method:', tokens.method(req, res),
        'End Point:', tokens.url(req, res),
        'Status:', tokens.status(req, res),
        'Content Length:', tokens.res(req, res, 'content-length'),
        'Response Time:', tokens['response-time'](req, res), 'ms'
    ].join(' | '));
});