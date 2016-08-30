'use strict';

var xml2js = require('xml2js');
var Promise = require('bluebird');

let debug = require('debug')('app:wechat:util');

exports.parseXMLAsync = function (xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, { trim: true }, function (err, content) {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
};

function formatMessage(result) {
    var message = {};

    if (typeof result === 'object') {
        let keys = Object.keys(result);

        for (let i = 0; i < keys.length; i++) {
            let item = result[keys[i]];
            let key = keys[i];

            // debug('item :%o', item);

            if (!(item instanceof Array) || item.length === 0) {
                // debug('item not array :%o');
                continue;
            }

            if (item.length === 1) {
                // debug('item length === 1');
                const val = item[0];

                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                // debug('item length > 1');
                // 不是0 也不是 1
                message[key] = [];

                for (let j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }

    return message;
}

exports.formatMessage = formatMessage;
