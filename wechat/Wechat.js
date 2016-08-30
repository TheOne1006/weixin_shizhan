var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var debug = require('debug')('app:wechat:Wechat');
/**
 * 微信配置
 *
 */
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    access_token: `${prefix}token?grant_type=client_credential`
};

function Wechat(opts) {
    var that = this;

    this.appID = opts.AppID;
    this.AppSecret = opts.AppSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.getAccessToken()
        .then(function (data) {
            debug('getAccessToken then 1 data %o', data);
            try {
                debug('-- pre json :%o', data);
                data = JSON.parse(data);
                debug('-- after json :%o', data);
            } catch (e) {
                return that.updateAccessToken();
            }

            if (that.isValidAccessToken(data)) {
                debug('isValidAccessToken(data) === true');
                return Promise.resolve(data);
            } else {
                debug('isValidAccessToken(data) === false');
                return that.updateAccessToken();
            }
        })
        .then(function (data) {
            debug('getAccessToken then 2 data %o', data);
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;

            that.saveAccessToken(data);
        });
}

Wechat.prototype.isValidAccessToken = function (data) {
    debug('isValidAccessToken data :%o', data);
    if (!data || !data.access_token || !data.expires_in) {
        debug('return false if 1');
        return false;
    }

    // var access_token = data.access_token;
    var expires_in = data.expires_in;

    var now = (new Date().getTime());

    debug('isValidAccessToken now : %o', now);
    debug('isValidAccessToken expires_in : %o', expires_in);

    if (now > expires_in) {
        debug('return false if 2');
        return false;
    }

    return true;

};


Wechat.prototype.updateAccessToken = function () {
    var appID = this.appID;
    var AppSecret = this.AppSecret;
    var url = `${api.access_token}&appid=${appID}&secret=${AppSecret}`;

    debug('url :%s', url);

    return new Promise(function (resolve) {
        request({ url: url, json: true })
            .then(function (response) {
                // debug('response :%o', response);
                debug('body :%o', response.body);

                var data = response.body;
                var now = (new Date().getTime());
                var expires_in = now + (data.expires_in - 20) * 1000;

                debug('now :%s', now);
                debug('expires_in :%s', expires_in);

                data.expires_in = expires_in;

                resolve(data);
            });
    });

};

module.exports = Wechat;
