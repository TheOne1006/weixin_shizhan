'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var debug = require('debug')('app:libs:util');

exports.readFileAsync = function (fpath, encoding) {
    debug('readFileAsync fpath :%s', fpath);

    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, encoding || 'utf-8', function (err, content) {
            debug('-- err: %o', err);
            debug('-- content: %o', content);

            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
};

exports.writeFileAsync = function (fpath, content) {

    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, content, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
