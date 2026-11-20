// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __generator = (this && this.__generator) || function (thisArg, body) {
//     var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
//     return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
//     function verb(n) { return function (v) { return step([n, v]); }; }
//     function step(op) {
//         if (f) throw new TypeError("Generator is already executing.");
//         while (g && (g = 0, op[0] && (_ = 0)), _) try {
//             if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
//             if (y = 0, t) op = [op[0] & 2, t.value];
//             switch (op[0]) {
//                 case 0: case 1: t = op; break;
//                 case 4: _.label++; return { value: op[1], done: false };
//                 case 5: _.label++; y = op[1]; op = [0]; continue;
//                 case 7: op = _.ops.pop(); _.trys.pop(); continue;
//                 default:
//                     if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
//                     if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
//                     if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
//                     if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
//                     if (t[2]) _.ops.pop();
//                     _.trys.pop(); continue;
//             }
//             op = body.call(thisArg, _);
//         } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
//         if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
//     }
// };
// var _a;
// Object.defineProperty(exports, "__esModule", { value: true });
// var chalk_1 = require("chalk");
// console.log(chalk_1.default.greenBright.bold('[INFO] Bot Start!!!'));
// var baileys_1 = require("@adiwajshing/baileys");
// var msgRetryCounterMap = {};
// var pino_1 = require("pino");
// var config_1 = require("./src/config");
// var sequelize = config_1.default.DATABASE;
// var helper_js_1 = require("./src/core/helper.js");
// var lastTyping_json_1 = require("./src/../lastTyping.json");
// var fs_1 = require("fs");
// var logger = (0, pino_1.default)({
//     timestamp: function () { return ",\"time\":\"".concat(new Date().toJSON(), "\""); },
// }).child({});
// logger.level = 'fatal';
// var store = (0, baileys_1.makeInMemoryStore)({ logger: logger });
// var live_score_js_1 = require("./src/services/live-score.js");
// var openai_js_1 = require("./src/services/openai.js");
// store === null || store === void 0 ? void 0 : store.readFromFile('./session.data.json');
// // save every 10s
// setInterval(function () {
//     store === null || store === void 0 ? void 0 : store.writeToFile('./session.data.json');
// }, 10000);
// var users = {
//     917982975985: 'Sadhvi',
//     918882612206: 'Musk',
//     918168265013: 'Yadav',
//     919210943308: 'Div',
//     917042275334: 'Sri',
//     917011411568: 'Pritam',
// };
// var deletedMsgEnabledGroups = (_a = {},
//     _a['120363149482284050@g.us'] = true,
//     _a);
// var muskanId = '918882612206@s.whatsapp.net';
// var hackIDOld = '120363047042799281@g.us';
// var tandelBazz = '120363029101329733@g.us';
// var myID = '917531813068@s.whatsapp.net';
// var yq = '120363028018556792@g.us';
// var hackID = '120363149482284050@g.us';
// function getTimeDifference(startTimestamp, endTimestamp) {
//     var diff = Math.abs(endTimestamp - startTimestamp);
//     var years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
//     var days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);
//     var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     var minutes = Math.floor((diff / (1000 * 60)) % 60);
//     var seconds = Math.floor((diff / 1000) % 60);
//     var output = '';
//     if (years > 0)
//         output += "".concat(years, " year").concat(years > 1 ? 's' : '');
//     if (days > 0 && years === 0)
//         output += "".concat(days, " day").concat(days > 1 ? 's' : '');
//     if (hours > 0 && days === 0 && years === 0)
//         output += "".concat(output.length > 0 ? ' and ' : '').concat(hours, " hour").concat(hours > 1 ? 's' : '');
//     if (minutes > 0 && days === 0 && hours === 0 && years === 0)
//         output += "".concat(output.length > 0 ? ' and ' : '').concat(minutes, " minute").concat(minutes > 1 ? 's' : '');
//     if (seconds > 0 && days === 0 && hours === 0 && minutes === 0 && years === 0)
//         output += "".concat(output.length > 0 ? ' and ' : '').concat(seconds, " second").concat(seconds > 1 ? 's' : '');
//     if (output.split(', ').length === 2) {
//         var index = output.lastIndexOf(',');
//         output = output.substring(0, index) + ' and' + output.substring(index + 1);
//     }
//     return output.trim();
// }
// var taskScheduled = false;
// function scheduleTaskAtTime(task, time) {
//     var currentTime = new Date().getTime();
//     var delay = time - currentTime;
//     if (delay < 0) {
//         return; // If the scheduled time has already passed, don't schedule the task
//     }
//     setTimeout(task, delay);
// }
// console.log(chalk_1.default.greenBright.bold('[INFO] Start Bot!!!'));
// // save every 1 minute
// setInterval(function () {
//     console.log(chalk_1.default.greenBright.bold('[INFO] Last Typing Saved!!!'));
//     fs_1.default.writeFile('./lastTyping.json', JSON.stringify(lastTyping_json_1.default), function (err) {
//         if (err) {
//             console.log(chalk_1.default.greenBright.bold('[INFO] Last Typing Error: ' + err));
//             console.log(err);
//         }
//     });
// }, 60 * 1000);
// var afk = {
//     enabled: true,
//     lastseen: new Date().getTime(),
// };
// function startSock() {
//     return __awaiter(this, void 0, void 0, function () {
//         var error_1, _a, state, saveCreds, _b, version, isLatest, sock;
//         var _this = this;
//         return __generator(this, function (_c) {
//             switch (_c.label) {
//                 case 0:
//                     console.log(chalk_1.default.greenBright.bold('[INFO] Sock Start'));
//                     _c.label = 1;
//                 case 1:
//                     _c.trys.push([1, 3, , 4]);
//                     return [4 /*yield*/, sequelize.authenticate()];
//                 case 2:
//                     _c.sent();
//                     console.log(chalk_1.default.greenBright.bold('[INFO] Connection has been established successfully.'));
//                     return [3 /*break*/, 4];
//                 case 3:
//                     error_1 = _c.sent();
//                     console.error('[ERROR] Unable to connect to the database:', error_1);
//                     return [3 /*break*/, 4];
//                 case 4:
//                     console.log(chalk_1.default.yellowBright.bold('[INFO] Syncing Database...'));
//                     return [4 /*yield*/, sequelize.sync()];
//                 case 5:
//                     _c.sent();
//                     console.log(chalk_1.default.greenBright.bold('[INFO] All models were synchronized successfully.'));
//                     return [4 /*yield*/, (0, baileys_1.useMultiFileAuthState)('auth_info_baileys')
//                         //   const { state, saveCreds } = await useRemoteFileAuthState();
//                     ];
//                 case 6:
//                     _a = _c.sent(), state = _a.state, saveCreds = _a.saveCreds;
//                     return [4 /*yield*/, (0, baileys_1.fetchLatestBaileysVersion)()];
//                 case 7:
//                     _b = _c.sent(), version = _b.version, isLatest = _b.isLatest;
//                     sock = (0, baileys_1.default)({
//                         logger: logger,
//                         version: version,
//                         printQRInTerminal: true,
//                         browser: ['PritamBot', 'Chrome', '4.0.0'],
//                         auth: state,
//                         msgRetryCounterMap: msgRetryCounterMap,
//                         // implement to handle retries
//                         getMessage: function (key) { return __awaiter(_this, void 0, void 0, function () {
//                             var msg;
//                             return __generator(this, function (_a) {
//                                 switch (_a.label) {
//                                     case 0:
//                                         if (!store) return [3 /*break*/, 2];
//                                         return [4 /*yield*/, store.loadMessage(key.remoteJid, key.id)];
//                                     case 1:
//                                         msg = _a.sent();
//                                         return [2 /*return*/, (msg === null || msg === void 0 ? void 0 : msg.message) || undefined];
//                                     case 2: return [2 /*return*/, {
//                                             conversation: '-pls ignore-',
//                                         }];
//                                 }
//                             });
//                         }); },
//                     });
//                     store === null || store === void 0 ? void 0 : store.bind(sock.ev);
//                     sock.ev.process(function (events) { return __awaiter(_this, void 0, void 0, function () {
//                         var eventKeys, _i, eventKeys_1, eventKey, update, connection, lastDisconnect, contacts, contactsUpdate, presence, id, presences, isGroup, sender, lastKnownPresence, number, lastReply, currTime, messages, randomFact, randomMessage, s, receipt, upsert, _a, _b, msg, chat, userMessage, messageInstance, type, scoreText, sender, messageId, deletedMessage, time, reactionMessage, sentMsgr, e_1, userMessage_1, _c, id, participants, action, groupMetadata, groupAdmins, groupSuperAdmins, nonSuperAdminsID;
//                         var _d, _e;
//                         return __generator(this, function (_f) {
//                             switch (_f.label) {
//                                 case 0:
//                                     eventKeys = Object.keys(events);
//                                     for (_i = 0, eventKeys_1 = eventKeys; _i < eventKeys_1.length; _i++) {
//                                         eventKey = eventKeys_1[_i];
//                                         console.log(chalk_1.default.greenBright.bold('[INFO] Event: ' + eventKey));
//                                     }
//                                     if (events['connection.update']) {
//                                         update = events['connection.update'];
//                                         connection = update.connection, lastDisconnect = update.lastDisconnect;
//                                         if (connection === 'close') {
//                                             if (((_e = (_d = lastDisconnect.error) === null || _d === void 0 ? void 0 : _d.output) === null || _e === void 0 ? void 0 : _e.statusCode) !==
//                                                 baileys_1.DisconnectReason.loggedOut) {
//                                                 startSock();
//                                             }
//                                             else {
//                                                 console.log(chalk_1.default.redBright('Connection closed. You are logged out. Delete the BotsApp.db and session.data.json files to rescan the code.'));
//                                                 process.exit(0);
//                                             }
//                                         }
//                                         else if (connection === 'connecting') {
//                                             console.log(chalk_1.default.yellowBright('[INFO] Connecting to WhatsApp...'));
//                                         }
//                                         else if (connection === 'open') {
//                                             console.log(chalk_1.default.greenBright.bold('[INFO] Connected! Welcome to BotsApp'));
//                                         }
//                                     }
//                                     if (!events['creds.update']) return [3 /*break*/, 2];
//                                     return [4 /*yield*/, saveCreds()];
//                                 case 1:
//                                     _f.sent();
//                                     _f.label = 2;
//                                 case 2:
//                                     if (events['contacts.upsert']) {
//                                         contacts = events['contacts.upsert'];
//                                         contactsUpdate = function (newContacts) {
//                                             for (var _i = 0, newContacts_1 = newContacts; _i < newContacts_1.length; _i++) {
//                                                 var contact = newContacts_1[_i];
//                                                 if (store.contacts[contact.id]) {
//                                                     Object.assign(store.contacts[contact.id], contact);
//                                                 }
//                                                 else {
//                                                     store.contacts[contact.id] = contact;
//                                                 }
//                                             }
//                                             return;
//                                         };
//                                         contactsUpdate(contacts);
//                                     }
//                                     if (!events['presence.update']) return [3 /*break*/, 9];
//                                     presence = events['presence.update'];
//                                     id = presence.id, presences = presence.presences;
//                                     isGroup = id.endsWith('@g.us');
//                                     if (!(isGroup && (id === hackID || id === tandelBazz))) return [3 /*break*/, 8];
//                                     sender = Object.keys(presences)[0];
//                                     lastKnownPresence = presences[sender].lastKnownPresence;
//                                     number = sender.split('@')[0];
//                                     lastReply = lastTyping_json_1.default.group[sender]
//                                         ? lastTyping_json_1.default.group[sender]
//                                         : new Date().getTime();
//                                     currTime = new Date().getTime();
//                                     if (!(currTime - lastReply > 60 * 60 * 1000)) return [3 /*break*/, 6];
//                                     lastTyping_json_1.default.group[sender] = new Date().getTime();
//                                     messages = [
//                                         'Whats up @' + number + '?',
//                                         "Kya chal raha hai @".concat(number, "?"),
//                                         "Welcome back @".concat(number, "!"),
//                                         "Hello @".concat(number, "!"),
//                                         "Aagye Apni maut ka Tamsha dekhne, @".concat(number),
//                                     ];
//                                     return [4 /*yield*/, (0, openai_js_1.generateRandomFact)()];
//                                 case 3:
//                                     randomFact = _f.sent();
//                                     randomMessage = "Hello @".concat(number, "!\n\n").concat(randomFact);
//                                     if (!lastKnownPresence) return [3 /*break*/, 5];
//                                     console.log(chalk_1.default.greenBright.bold('[INFO] Sending Message: ' + randomMessage));
//                                     return [4 /*yield*/, sock.sendMessage(id, {
//                                             text: randomMessage,
//                                             mentions: [sender],
//                                         })];
//                                 case 4:
//                                     s = _f.sent();
//                                     console.log(chalk_1.default.greenBright.bold('[INFO] Message Sent: ' + JSON.stringify(s, null, 2)));
//                                     _f.label = 5;
//                                 case 5: return [3 /*break*/, 7];
//                                 case 6:
//                                     if (lastKnownPresence == 'composing') {
//                                         lastTyping_json_1.default.group[sender] = new Date().getTime();
//                                         console.log(chalk_1.default.greenBright.bold('[INFO] Last reply was less than 1 hour ago'));
//                                     }
//                                     _f.label = 7;
//                                 case 7: return [3 /*break*/, 9];
//                                 case 8:
//                                     if (!isGroup) {
//                                         // const sender = Object.keys(presences)[0];
//                                         // const { lastKnownPresence } = presences[sender];
//                                         // // const name = users[sender.replace('@s.whatsapp.net', '')];
//                                         // const lastReply = lastTyping[sender] ? lastTyping[sender] : new Date().getTime();
//                                         // const currTime = new Date().getTime();
//                                         // if (currTime - lastReply > 60 * 60 * 1000) {
//                                         //     // Some conversation starters messages list
//                                         //     const messages = [
//                                         //         "Whats up?",
//                                         //         `Kya chal raha hai?`,
//                                         //         `Hi!`,
//                                         //         `Hello!`,
//                                         //         "Yo",
//                                         //         "Hey",
//                                         //         // `Aagye Apni maut ka Tamsha dekhne, ${name}`,
//                                         //     ]
//                                         //     // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
//                                         //     const randomFact = await generateRandomFact();
//                                         //     const randomMessage = `Hello!\n${randomFact}`;
//                                         //     if (lastKnownPresence == "composing") {
//                                         //         lastTyping[sender] = new Date().getTime();
//                                         //         console.log(chalk.greenBright.bold('[INFO] Sending Message: ' + randomMessage));
//                                         //         const s = await sock.sendMessage(id, { text: randomMessage });
//                                         //         console.log(chalk.greenBright.bold('[INFO] Message Sent: ' + JSON.stringify(s, null, 2)));
//                                         //     }
//                                         // } else if (lastKnownPresence == "composing") {
//                                         //     console.log(chalk.greenBright.bold('[INFO] Last reply was less than 1 hour ago'));
//                                         //     lastTyping[sender] = new Date().getTime();
//                                         // }
//                                     }
//                                     _f.label = 9;
//                                 case 9:
//                                     if (events['message-receipt.update']) {
//                                         receipt = events['message-receipt.update'];
//                                         console.log(chalk_1.default.greenBright.bold('[INFO] message-receipt.update: ' + JSON.stringify(receipt, null, 2)));
//                                     }
//                                     if (!events['messages.upsert']) return [3 /*break*/, 30];
//                                     upsert = events['messages.upsert'];
//                                     if (upsert.type !== 'notify') {
//                                         console.log(chalk_1.default.greenBright.bold('[INFO] Chats update: Message not notify ' +
//                                             JSON.stringify(upsert, null, 2)));
//                                         return [2 /*return*/];
//                                     }
//                                     _a = 0, _b = upsert.messages;
//                                     _f.label = 10;
//                                 case 10:
//                                     if (!(_a < _b.length)) return [3 /*break*/, 30];
//                                     msg = _b[_a];
//                                     chat = msg;
//                                     userMessage = chat.message.extendedTextMessage
//                                         ? chat.message.extendedTextMessage.text
//                                         : chat.message.conversation;
//                                     console.log(chalk_1.default.greenBright.bold('[INFO] Chats Message: ' + userMessage));
//                                     messageInstance = (0, helper_js_1.default)(chat, sock);
//                                     if (!userMessage.startsWith('!score')) return [3 /*break*/, 13];
//                                     console.log(chalk_1.default.greenBright.bold('[INFO] Chats update: ' + userMessage));
//                                     type = userMessage.split('--').length > 1
//                                         ? messageInstance.body.split('--')[1].split(' ')[0]
//                                         : 'upcoming';
//                                     return [4 /*yield*/, (0, live_score_js_1.default)(type)];
//                                 case 11:
//                                     scoreText = _f.sent();
//                                     return [4 /*yield*/, sock.sendMessage(chat.key.remoteJid, { text: scoreText }, { quoted: msg })];
//                                 case 12:
//                                     _f.sent();
//                                     return [2 /*return*/];
//                                 case 13:
//                                     if (!!messageInstance.fromMe) return [3 /*break*/, 17];
//                                     if (!(messageInstance.isDeleted &&
//                                         ((messageInstance.isGroup &&
//                                             deletedMsgEnabledGroups[messageInstance.chatId]) ||
//                                             messageInstance.chatId.includes('@s.whatsapp.net')))) return [3 /*break*/, 16];
//                                     console.log(chalk_1.default.redBright.bold("[INFO] Message deleted."));
//                                     console.log(JSON.stringify(messageInstance, null, 2));
//                                     sender = messageInstance.sender;
//                                     messageId = messageInstance.deletedMessageID;
//                                     console.log(chalk_1.default.redBright.bold("[INFO] Deleted message id: ".concat(messageId)));
//                                     return [4 /*yield*/, store.loadMessage(messageInstance.chatId, messageId)];
//                                 case 14:
//                                     deletedMessage = _f.sent();
//                                     if (!deletedMessage) {
//                                         console.log(chalk_1.default.redBright.bold("[INFO] Deleted message not found."));
//                                         return [2 /*return*/];
//                                     }
//                                     // forward the deleted message to the admin based on the message type
//                                     return [4 /*yield*/, sock.sendMessage(messageInstance.chatId, { forward: deletedMessage }, { quoted: deletedMessage })];
//                                 case 15:
//                                     // forward the deleted message to the admin based on the message type
//                                     _f.sent();
//                                     _f.label = 16;
//                                 case 16: return [3 /*break*/, 29];
//                                 case 17:
//                                     if (!(!chat.key.fromMe &&
//                                         chat.key.remoteJid.includes('@s.whatsapp.net'))) return [3 /*break*/, 24];
//                                     if (!afk.enabled) return [3 /*break*/, 23];
//                                     time = getTimeDifference(new Date().getTime(), afk.lastseen);
//                                     reactionMessage = {
//                                         react: {
//                                             text: '😴',
//                                             key: chat.key,
//                                         },
//                                     };
//                                     return [4 /*yield*/, sock.sendMessage(chat.key.remoteJid, reactionMessage)];
//                                 case 18:
//                                     sentMsgr = _f.sent();
//                                     _f.label = 19;
//                                 case 19:
//                                     _f.trys.push([19, 21, , 22]);
//                                     return [4 /*yield*/, sock.sendMessage(chat.key.remoteJid, {
//                                             text: 'Pritam is offline right now.\nLast seen: ' +
//                                                 time +
//                                                 ' ago.',
//                                         }, { quoted: chat })];
//                                 case 20:
//                                     _f.sent();
//                                     return [3 /*break*/, 22];
//                                 case 21:
//                                     e_1 = _f.sent();
//                                     console.log(e_1);
//                                     return [3 /*break*/, 22];
//                                 case 22: return [2 /*return*/];
//                                 case 23: return [3 /*break*/, 29];
//                                 case 24:
//                                     userMessage_1 = chat.message.extendedTextMessage
//                                         ? chat.message.extendedTextMessage.text
//                                         : chat.message.conversation;
//                                     if (!(userMessage_1 == '!afk')) return [3 /*break*/, 26];
//                                     afk.enabled = !afk.enabled;
//                                     afk.lastseen = new Date().getTime();
//                                     return [4 /*yield*/, sock.sendMessage(chat.key.remoteJid, { text: "afk is ".concat(afk.enabled ? 'enabled' : 'disabled') }, { quoted: chat })];
//                                 case 25:
//                                     _f.sent();
//                                     return [2 /*return*/];
//                                 case 26:
//                                     if (!userMessage_1.includes('!del')) return [3 /*break*/, 28];
//                                     deletedMsgEnabledGroups[chat.key.remoteJid] =
//                                         deletedMsgEnabledGroups[chat.key.remoteJid] ? false : true;
//                                     return [4 /*yield*/, sock.sendMessage(chat.key.remoteJid, {
//                                             text: "Deleted message logging is ".concat(deletedMsgEnabledGroups[chat.key.remoteJid]
//                                                 ? 'enabled'
//                                                 : 'disabled'),
//                                         }, { quoted: chat })];
//                                 case 27:
//                                     _f.sent();
//                                     return [2 /*return*/];
//                                 case 28:
//                                     if (userMessage_1.startsWith('!wgpt')) {
//                                     }
//                                     _f.label = 29;
//                                 case 29:
//                                     _a++;
//                                     return [3 /*break*/, 10];
//                                 case 30:
//                                     if (!events['group-participants.update']) return [3 /*break*/, 35];
//                                     _c = events['group-participants.update'], id = _c.id, participants = _c.participants, action = _c.action;
//                                     console.log(JSON.stringify(events['group-participants.update'], null, 2));
//                                     if (!(participants[0] === myID)) return [3 /*break*/, 35];
//                                     if (!(action === 'promote')) return [3 /*break*/, 35];
//                                     console.log(chalk_1.default.redBright.bold("[INFO] Promoted to admin."));
//                                     return [4 /*yield*/, sock.groupMetadata(id)];
//                                 case 31:
//                                     groupMetadata = _f.sent();
//                                     console.log(JSON.stringify(groupMetadata, null, 2));
//                                     groupAdmins = groupMetadata.participants.filter(function (participant) { return participant.admin === 'admin'; });
//                                     groupSuperAdmins = groupMetadata.participants.filter(function (participant) { return participant.admin === 'superadmin'; });
//                                     nonSuperAdminsID = groupAdmins
//                                         .filter(function (admin) { return admin.id !== myID; })
//                                         .map(function (admin) { return admin.id; });
//                                     if (!(nonSuperAdminsID.length > 0)) return [3 /*break*/, 33];
//                                     return [4 /*yield*/, sock.groupParticipantsUpdate(id, nonSuperAdminsID, 'demote')];
//                                 case 32:
//                                     _f.sent();
//                                     _f.label = 33;
//                                 case 33:
//                                     if (!(groupSuperAdmins.length === 0 ||
//                                         (groupSuperAdmins.length === 1 && groupSuperAdmins[0].id == myID))) return [3 /*break*/, 35];
//                                     return [4 /*yield*/, sock.sendMessage(id, {
//                                             text: 'Hah haah haaah!, Now i am the king of this group!',
//                                         })];
//                                 case 34:
//                                     _f.sent();
//                                     _f.label = 35;
//                                 case 35:
//                                     if (events['messages.update']) {
//                                         console.log(JSON.stringify(events['messages.update'], null, 2));
//                                     }
//                                     return [2 /*return*/];
//                             }
//                         });
//                     }); });
//                     return [2 /*return*/, sock];
//             }
//         });
//     });
// }
// try {
//     startSock();
// }
// catch (error) {
//     console.log(error);
// }
