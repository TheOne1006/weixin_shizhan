'use strict';

var debug = require('debug')('app:weixin');

exports.reply = function* (next) {
    var message = this.weixin;

    debug('message :%o', message);

    /**
     * 消息信息分类
     * 普通消息 / 事件推送
     */
    if (message.MsgType === 'event') {
        /**
         * 事件通过 message.Event 判断事件类型
         */
        if (message.Event === 'subscribe') {
            debug('set body');

            if (message.EventKey) {
                // 二维码的参数值
                debug('扫描二维码进入: EventKey: %s , %s', message.EventKey, message.ticket);
            }
            this.body = '你订阅了本账号!';
        } else if (message.Event === 'unsubscribe') {
            debug('取消订阅');
            this.body = '';
        } else if (message.Event === 'LOCATION') {
            this.body = `您上报的的位置:${message.Latitude} - ${message.Longitude} - ${message.Precision}`;
        }
    }

    yield next;
};
