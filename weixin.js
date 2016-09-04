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
    } else if (message.MsgType === 'text') {

        const content = message.Content;
        let replyContent = '';

        // 回复文字
        switch (content) {
            case '1':
                replyContent = '自动回复1';
                break;
            case '2':
                replyContent = '自动回复2';
                break;
            case '3':
                replyContent = [{
                    title: 'title',
                    description: 'desc',
                    picUrl: 'https://res.cloudinary.com/theone/image/upload/v1430750829/rjpkswtvxxte4105ttrg.jpg',
                    url: 'http://www.theone.io'
                }, {
                    title: 'title2',
                    description: 'desc2',
                    picUrl: 'https://res.cloudinary.com/theone/image/upload/v1430750900/o0ohnh0hb1t8dlc7o0ln.jpg',
                    url: 'http://www.theone.io/cate/js/'
                }];
                break;
            default:
                replyContent = `您输入的是: ${content}`;
        }

        this.body = replyContent;
    }

    yield next;
};
