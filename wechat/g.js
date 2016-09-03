'use strict';
var sha1 = require('sha1');
var Wechat = require('./Wechat');
var getRawBody = require('raw-body');
var util = require('./util');
var debug = require('debug')('app:wechat:g');


module.exports = function (options, handler) {
    var wechat = new Wechat(options);

    return function* (next) {
        debug(this.query);
        const that = this;

        var token = options.token;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        var echostr = this.query.echostr;

        var checkStr = [token, timestamp, nonce].sort().join('');
        var shaStr = sha1(checkStr);

        if (this.method === 'GET') {
            if (shaStr === signature) {
                this.body = echostr + '';
            } else {
                this.body = 'wrong';
            }
        } else if (this.method === 'POST') {
            if (shaStr !== signature) {
                this.body = 'wrong';

                debug('return wrong');

                return false;
            }

            let data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });

            debug(data.toString());

            let content = yield util.parseXMLAsync(data);

            debug('content :%o', content);

            let message = util.formatMessage(content.xml);

            debug('message :%s', message);

            this.weixin = message;

            yield handler.call(this, next);

            wechat.reply.call(this);
        }
    };
};
