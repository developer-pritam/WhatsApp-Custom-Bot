"use strict";
var config_1 = require("../config");
var chalk_1 = require("chalk");
var sidekick_1 = require("./sidekick");
var users = {
    917982975985: "Sadhvi",
    918882612206: "Muskan",
    918168265013: "Aman",
    919210943308: "Div",
    917042275334: "Srishti",
    917011411568: "Pritam"
};
var resolve = function (messageInstance, client) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34;
    var BotsApp = new sidekick_1.default();
    var prefix = config_1.default.PREFIX + '\\w+';
    var prefixRegex = new RegExp(prefix, 'g');
    var SUDOstring = config_1.default.SUDO;
    try {
        var jsonMessage = JSON.stringify(messageInstance);
    }
    catch (err) {
        console.log(chalk_1.default.redBright("[ERROR] Something went wrong. ", err));
    }
    BotsApp.chatId = messageInstance.key.remoteJid;
    BotsApp.fromMe = messageInstance.key.fromMe;
    BotsApp.owner = client.user.id.replace(/:.*@/g, '@');
    BotsApp.mimeType = messageInstance.message ? (Object.keys(messageInstance.message)[0] === 'senderKeyDistributionMessage' ? Object.keys(messageInstance.message)[2] : (Object.keys(messageInstance.message)[0] === 'messageContextInfo' ? Object.keys(messageInstance.message)[1] : Object.keys(messageInstance.message)[0])) : null;
    BotsApp.type = BotsApp.mimeType === 'imageMessage' ? 'image' : (BotsApp.mimeType === 'videoMessage') ? 'video' : (BotsApp.mimeType === 'conversation' || BotsApp.mimeType == 'extendedTextMessage') ? 'text' : (BotsApp.mimeType === 'audioMessage') ? 'audio' : (BotsApp.mimeType === 'stickerMessage') ? 'sticker' : (BotsApp.mimeType === 'senderKeyDistributionMessage' && ((_b = (_a = messageInstance.message) === null || _a === void 0 ? void 0 : _a.senderKeyDistributionMessage) === null || _b === void 0 ? void 0 : _b.groupId) === 'status@broadcast') ? 'status' : null;
    BotsApp.isTextReply = (BotsApp.mimeType === 'extendedTextMessage' && ((_e = (_d = (_c = messageInstance.message) === null || _c === void 0 ? void 0 : _c.extendedTextMessage) === null || _d === void 0 ? void 0 : _d.contextInfo) === null || _e === void 0 ? void 0 : _e.stanzaId)) ? true : false;
    BotsApp.replyMessageId = (_h = (_g = (_f = messageInstance.message) === null || _f === void 0 ? void 0 : _f.extendedTextMessage) === null || _g === void 0 ? void 0 : _g.contextInfo) === null || _h === void 0 ? void 0 : _h.stanzaId;
    BotsApp.replyParticipant = (_l = (_k = (_j = messageInstance.message) === null || _j === void 0 ? void 0 : _j.extendedTextMessage) === null || _k === void 0 ? void 0 : _k.contextInfo) === null || _l === void 0 ? void 0 : _l.participant.replace(/:.*@/g, '@');
    ;
    BotsApp.replyMessage = ((_q = (_p = (_o = (_m = messageInstance.message) === null || _m === void 0 ? void 0 : _m.extendedTextMessage) === null || _o === void 0 ? void 0 : _o.contextInfo) === null || _p === void 0 ? void 0 : _p.quotedMessage) === null || _q === void 0 ? void 0 : _q.conversation) || ((_v = (_u = (_t = (_s = (_r = messageInstance.message) === null || _r === void 0 ? void 0 : _r.extendedTextMessage) === null || _s === void 0 ? void 0 : _s.contextInfo) === null || _t === void 0 ? void 0 : _t.quotedMessage) === null || _u === void 0 ? void 0 : _u.extendedTextMessage) === null || _v === void 0 ? void 0 : _v.text);
    BotsApp.body = BotsApp.mimeType === 'conversation' ? (_w = messageInstance.message) === null || _w === void 0 ? void 0 : _w.conversation : (BotsApp.mimeType == 'imageMessage') ? (_x = messageInstance.message) === null || _x === void 0 ? void 0 : _x.imageMessage.caption : (BotsApp.mimeType == 'videoMessage') ? (_y = messageInstance.message) === null || _y === void 0 ? void 0 : _y.videoMessage.caption : (BotsApp.mimeType == 'extendedTextMessage') ? (_0 = (_z = messageInstance.message) === null || _z === void 0 ? void 0 : _z.extendedTextMessage) === null || _0 === void 0 ? void 0 : _0.text : (BotsApp.mimeType == 'buttonsResponseMessage') ? (_1 = messageInstance.message) === null || _1 === void 0 ? void 0 : _1.buttonsResponseMessage.selectedDisplayText : null;
    BotsApp.isCmd = prefixRegex.test(BotsApp.body);
    BotsApp.commandName = BotsApp.isCmd ? BotsApp.body.slice(1).trim().split(/ +/).shift().toLowerCase().split('\n')[0] : null;
    BotsApp.isImage = BotsApp.type === "image";
    BotsApp.isReplyImage = ((_5 = (_4 = (_3 = (_2 = messageInstance.message) === null || _2 === void 0 ? void 0 : _2.extendedTextMessage) === null || _3 === void 0 ? void 0 : _3.contextInfo) === null || _4 === void 0 ? void 0 : _4.quotedMessage) === null || _5 === void 0 ? void 0 : _5.imageMessage) ? true : false;
    BotsApp.imageCaption = BotsApp.isImage ? (_6 = messageInstance.message) === null || _6 === void 0 ? void 0 : _6.imageMessage.caption : null;
    BotsApp.isGIF = (BotsApp.type === 'video' && ((_8 = (_7 = messageInstance.message) === null || _7 === void 0 ? void 0 : _7.videoMessage) === null || _8 === void 0 ? void 0 : _8.gifPlayback));
    BotsApp.isReplyGIF = ((_13 = (_12 = (_11 = (_10 = (_9 = messageInstance.message) === null || _9 === void 0 ? void 0 : _9.extendedTextMessage) === null || _10 === void 0 ? void 0 : _10.contextInfo) === null || _11 === void 0 ? void 0 : _11.quotedMessage) === null || _12 === void 0 ? void 0 : _12.videoMessage) === null || _13 === void 0 ? void 0 : _13.gifPlayback) ? true : false;
    BotsApp.isSticker = BotsApp.type === 'sticker';
    BotsApp.isReplySticker = ((_17 = (_16 = (_15 = (_14 = messageInstance.message) === null || _14 === void 0 ? void 0 : _14.extendedTextMessage) === null || _15 === void 0 ? void 0 : _15.contextInfo) === null || _16 === void 0 ? void 0 : _16.quotedMessage) === null || _17 === void 0 ? void 0 : _17.stickerMessage) ? true : false;
    BotsApp.isReplyAnimatedSticker = (_22 = (_21 = (_20 = (_19 = (_18 = messageInstance.message) === null || _18 === void 0 ? void 0 : _18.extendedTextMessage) === null || _19 === void 0 ? void 0 : _19.contextInfo) === null || _20 === void 0 ? void 0 : _20.quotedMessage) === null || _21 === void 0 ? void 0 : _21.stickerMessage) === null || _22 === void 0 ? void 0 : _22.isAnimated;
    BotsApp.isVideo = (BotsApp.type === 'video' && !((_24 = (_23 = messageInstance.message) === null || _23 === void 0 ? void 0 : _23.videoMessage) === null || _24 === void 0 ? void 0 : _24.gifPlayback));
    BotsApp.isReplyVideo = BotsApp.isTextReply ? (jsonMessage.indexOf("videoMessage") !== -1 && !((_26 = (_25 = messageInstance.message) === null || _25 === void 0 ? void 0 : _25.extendedTextMessage) === null || _26 === void 0 ? void 0 : _26.contextInfo.quotedMessage.videoMessage.gifPlayback)) : false;
    BotsApp.isAudio = BotsApp.type === 'audio';
    BotsApp.isReplyAudio = ((_30 = (_29 = (_28 = (_27 = messageInstance.message) === null || _27 === void 0 ? void 0 : _27.extendedTextMessage) === null || _28 === void 0 ? void 0 : _28.contextInfo) === null || _29 === void 0 ? void 0 : _29.quotedMessage) === null || _30 === void 0 ? void 0 : _30.audioMessage) ? true : false;
    BotsApp.logGroup = client.user.id.replace(/:.*@/g, '@');
    ;
    BotsApp.isGroup = BotsApp.chatId.endsWith('@g.us');
    BotsApp.isPm = !BotsApp.isGroup;
    BotsApp.sender = (BotsApp.isGroup && messageInstance.message && BotsApp.fromMe) ? BotsApp.owner : (BotsApp.isGroup && messageInstance.message) ? messageInstance.key.participant.replace(/:.*@/g, '@') : (!BotsApp.isGroup) ? BotsApp.chatId : null;
    BotsApp.isSenderSUDO = SUDOstring.includes((_31 = BotsApp.sender) === null || _31 === void 0 ? void 0 : _31.substring(0, BotsApp.sender.indexOf("@")));
    BotsApp.messageFrom = BotsApp.fromMe ? "Me" : users[messageInstance.key.participant] ? users[(_32 = BotsApp.sender) === null || _32 === void 0 ? void 0 : _32.substring(0, BotsApp.sender.indexOf("@"))] : messageInstance.pushName;
    BotsApp.isDeleted = ((_34 = (_33 = messageInstance.message) === null || _33 === void 0 ? void 0 : _33.protocolMessage) === null || _34 === void 0 ? void 0 : _34.type) === 0 ? true : false;
    BotsApp.deletedMessageID = BotsApp.isDeleted ? messageInstance.message.protocolMessage.key.id : null;
    return BotsApp;
};
module.exports = resolve;
