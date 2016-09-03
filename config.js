'use strict';

var path = require('path');
var wechat_file = path.join(__dirname, './config/wechat.txt');
var util = require('./libs/util');
var debug = require('debug')('app:config');

/**
 * 配置信息
 */
var config = {
    wechat: {
        AppID: 'wx364bf6b94bd78af0',
        AppSecret: '963d8d47e180a95ec4759fb72d8a1043',
        token: 'ceshiyigewechat',
        /**
         * 通过文件获取 access token
         * @return {Object} Promise
         */
        getAccessToken: function () {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function (data) {
            debug('saveAccessToken data :%o', data);
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
};

module.exports = config;
