'use strict';

const ejs = require('ejs');
const heredoc = require('heredoc');

const tpl = heredoc(function () {
    /*
    <xml>
    <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
    <CreateTime><%= createTime %></CreateTime>
    <MsgType><![CDATA[<%= msgType %>]]></MsgType>
    <% if (msgType === 'text') {%>
        <Content><![CDATA[<%- content %>]]></Content>
    <% } %>
    <% if (msgType === 'image') { %>
        <Image>
        <MediaId><![CDATA[<%= mediaId %>]]></MediaId>
        </Image>
    <% } %>
    <% if (msgType === 'voice') { %>
        <Voice>
        <MediaId><![CDATA[<%= mediaId %>]]></MediaId>
        </Voice>
    <% } %>
    <% if (msgType === 'video') { %>
        <Video>
        <MediaId><![CDATA[<%= mediaId %>]]></MediaId>
        <Title><![CDATA[<%= title %>]]></Title>
        <Description><![CDATA[<%= description %>]]></Description>
        </Video>
    <% } %>
    <% if (msgType === 'music') { %>
        <Music>
        <Title><![CDATA[<%= title %>]]></Title>
        <Description><![CDATA[<%= description %>]]></Description>
        <MusicUrl><![CDATA[<%= musicUrl %>]]></MusicUrl>
        <HQMusicUrl><![CDATA[<%= hqMusicurl %>]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[<%= mediaId %>]]></ThumbMediaId>
        </Music>
    <% } %>
    <% if (msgType === 'news') { %>
        <ArticleCount>2</ArticleCount>
        <Articles>
            <item>
                <Title><![CDATA[title1]]></Title>
                <Description><![CDATA[description1]]></Description>
                <PicUrl><![CDATA[picurl]]></PicUrl>
                <Url><![CDATA[url]]></Url>
            </item>
            <item>
                <Title><![CDATA[title]]></Title>
                <Description><![CDATA[description]]></Description>
                <PicUrl><![CDATA[picurl]]></PicUrl>
                <Url><![CDATA[url]]></Url>
            </item>
        </Articles>
    <% } %>
    </xml>
    */
});

const compiled = ejs.compile(tpl);

exports = module.exports = {
    compiled
};
