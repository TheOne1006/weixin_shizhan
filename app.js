'use strict';

var Koa = require('koa');
var wechat = require('./wechat/g');
var config = require('./config');
var weixin = require('./weixin');
// var debug = require('debug')('app:index:index');


// 实例化

var app = new Koa();

app.use(wechat(config.wechat, weixin.reply));

app.listen(8080);
console.log('listen at 8080');
