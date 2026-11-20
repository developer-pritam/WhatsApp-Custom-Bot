// import chalk from 'chalk';
// console.log(chalk.greenBright.bold('[INFO] Bot Start!!!'));
// import makeWASocket, {
//   MessageRetryMap,
//   DisconnectReason,
//   fetchLatestBaileysVersion,
//   makeInMemoryStore,
//   WASocket,
//   proto,
//   useMultiFileAuthState,
//   Contact,
// } from '@adiwajshing/baileys';
// const msgRetryCounterMap: MessageRetryMap = {};
// import P, { Logger } from 'pino';
// import { Boom } from '@hapi/boom';
// import { Sequelize } from 'sequelize/types';
// import config from './src/config';
// const sequelize: Sequelize = config.DATABASE;
// import resolve from './src/core/helper.js';
// import BotsApp from './src/core/sidekick.js';
// import lastTyping from './src/../lastTyping.json';
// import fs from 'fs';
// const logger: Logger = P({
//   timestamp: () => `,"time":"${new Date().toJSON()}"`,
// }).child({});
// logger.level = 'fatal';
// const store = makeInMemoryStore({ logger });
// import getScore from './src/services/live-score.js';
// import { generateRandomFact } from './src/services/openai.js';
// store?.readFromFile('./session.data.json');
// // save every 10s
// setInterval(() => {
//   store?.writeToFile('./session.data.json');
// }, 10_000);
// const users = {
//   917982975985: 'Sadhvi',
//   918882612206: 'Musk',
//   918168265013: 'Yadav',
//   919210943308: 'Div',
//   917042275334: 'Sri',
//   917011411568: 'Pritam',
// };

// const deletedMsgEnabledGroups = {
//   ['120363149482284050@g.us']: true,
// };
// const muskanId = '918882612206@s.whatsapp.net';
// const hackIDOld = '120363047042799281@g.us';
// const tandelBazz = '120363029101329733@g.us';
// const myID = '917531813068@s.whatsapp.net';
// const yq = '120363028018556792@g.us';
// const hackID = '120363149482284050@g.us';

// let taskScheduled = false;
// function scheduleTaskAtTime(
//   task: { (): Promise<void>; (): Promise<void>; (): void },
//   time: number,
// ) {
//   const currentTime = new Date().getTime();
//   const delay = time - currentTime;
//   if (delay < 0) {
//     return; // If the scheduled time has already passed, don't schedule the task
//   }
//   setTimeout(task, delay);
// }
// console.log(chalk.greenBright.bold('[INFO] Start Bot!!!'));

// // save every 1 minute
// setInterval(() => {
//   console.log(chalk.greenBright.bold('[INFO] Last Typing Saved!!!'));
//   fs.writeFile('./lastTyping.json', JSON.stringify(lastTyping), (err) => {
//     if (err) {
//       console.log(chalk.greenBright.bold('[INFO] Last Typing Error: ' + err));

//       console.log(err);
//     }
//   });
// }, 60 * 1000);
// const afk = {
//   enabled: true,
//   lastseen: new Date().getTime(),
// };

// async function startSock() {
//   console.log(chalk.greenBright.bold('[INFO] Sock Start'));

//   try {
//     await sequelize.authenticate();
//     console.log(
//       chalk.greenBright.bold(
//         '[INFO] Connection has been established successfully.',
//       ),
//     );
//   } catch (error) {
//     console.error('[ERROR] Unable to connect to the database:', error);
//   }
//   console.log(chalk.yellowBright.bold('[INFO] Syncing Database...'));
//   await sequelize.sync();

//   console.log(
//     chalk.greenBright.bold('[INFO] All models were synchronized successfully.'),
//   );
//   const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
//   //   const { state, saveCreds } = await useRemoteFileAuthState();
//   const { version, isLatest } = await fetchLatestBaileysVersion();
//   const sock: WASocket = makeWASocket({
//     logger,
//     version,
//     printQRInTerminal: true,
//     browser: ['PritamBot', 'Chrome', '4.0.0'],
//     auth: state,
//     msgRetryCounterMap,
//     // implement to handle retries
//     getMessage: async (key) => {
//       if (store) {
//         const msg = await store.loadMessage(key.remoteJid!, key.id!);
//         return msg?.message || undefined;
//       }
//       return {
//         conversation: '-pls ignore-',
//       };
//     },
//   });
//   store?.bind(sock.ev);

//   sock.ev.process(async (events) => {
//     const eventKeys = Object.keys(events);
//     for (const eventKey of eventKeys) {
//       console.log(chalk.greenBright.bold('[INFO] Event: ' + eventKey));
//     }
//     if (events['connection.update']) {
//       const update = events['connection.update'];
//       // console.log(chalk.greenBright.bold('[INFO] Connection update: ' + JSON.stringify(update, null, 2) + ''));
//       const { connection, lastDisconnect } = update;
//       if (connection === 'close') {
//         if (
//           (lastDisconnect.error as Boom)?.output?.statusCode !==
//           DisconnectReason.loggedOut
//         ) {
//           startSock();
//         } else {
//           console.log(
//             chalk.redBright(
//               'Connection closed. You are logged out. Delete the BotsApp.db and session.data.json files to rescan the code.',
//             ),
//           );
//           process.exit(0);
//         }
//       } else if (connection === 'connecting') {
//         console.log(chalk.yellowBright('[INFO] Connecting to WhatsApp...'));
//       } else if (connection === 'open') {
//         console.log(
//           chalk.greenBright.bold('[INFO] Connected! Welcome to BotsApp'),
//         );
//       }
//     }
//     if (events['creds.update']) {
//       await saveCreds();
//     }
//     if (events['contacts.upsert']) {
//       const contacts: Contact[] = events['contacts.upsert'];
//       const contactsUpdate = (newContacts: Contact[]) => {
//         for (const contact of newContacts) {
//           if (store.contacts[contact.id]) {
//             Object.assign(store.contacts[contact.id], contact);
//           } else {
//             store.contacts[contact.id] = contact;
//           }
//         }
//         return;
//       };

//       contactsUpdate(contacts);
//     }
//     if (events['presence.update']) {
//       // console.log(chalk.greenBright.bold('[INFO] Chats update: ' + JSON.stringify(events['presence.update'], null, 2) + ''));
//       // {
//       //     "id": "120363047042799281@g.us",
//       //     "presences": {
//       //       "919210943308@s.whatsapp.net": {
//       //         "lastKnownPresence": "composing"
//       //       }
//       //     }
//       //   }

//       const presence = events['presence.update'];
//       const { id, presences } = presence;
//       const isGroup = id.endsWith('@g.us');
//       if (isGroup && (id === hackID || id === tandelBazz)) {
//         const sender = Object.keys(presences)[0];
//         const { lastKnownPresence } = presences[sender];
//         // const name = users[sender.replace('@s.whatsapp.net', '')];
//         const number = sender.split('@')[0];
//         const lastReply = lastTyping.group[sender]
//           ? lastTyping.group[sender]
//           : new Date().getTime();
//         const currTime = new Date().getTime();
//         // if currtime and lastreply is greater than 1.5 hour
//         if (currTime - lastReply > 60 * 60 * 1000) {
//           lastTyping.group[sender] = new Date().getTime();
//           const messages = [
//             'Whats up @' + number + '?',
//             `Kya chal raha hai @${number}?`,
//             `Welcome back @${number}!`,
//             `Hello @${number}!`,
//             `Aagye Apni maut ka Tamsha dekhne, @${number}`,
//           ];
//           // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
//           const randomFact = await generateRandomFact();
//           const randomMessage = `Hello @${number}!\n\n${randomFact}`;

//           if (lastKnownPresence) {
//             console.log(
//               chalk.greenBright.bold(
//                 '[INFO] Sending Message: ' + randomMessage,
//               ),
//             );
//             const s = await sock.sendMessage(id, {
//               text: randomMessage,
//               mentions: [sender],
//             });
//             console.log(
//               chalk.greenBright.bold(
//                 '[INFO] Message Sent: ' + JSON.stringify(s, null, 2),
//               ),
//             );
//           }
//         } else if (lastKnownPresence == 'composing') {
//           lastTyping.group[sender] = new Date().getTime();

//           console.log(
//             chalk.greenBright.bold(
//               '[INFO] Last reply was less than 1 hour ago',
//             ),
//           );
//         }
//       } else if (!isGroup) {
//         // const sender = Object.keys(presences)[0];
//         // const { lastKnownPresence } = presences[sender];
//         // // const name = users[sender.replace('@s.whatsapp.net', '')];
//         // const lastReply = lastTyping[sender] ? lastTyping[sender] : new Date().getTime();
//         // const currTime = new Date().getTime();
//         // if (currTime - lastReply > 60 * 60 * 1000) {
//         //     // Some conversation starters messages list
//         //     const messages = [
//         //         "Whats up?",
//         //         `Kya chal raha hai?`,
//         //         `Hi!`,
//         //         `Hello!`,
//         //         "Yo",
//         //         "Hey",
//         //         // `Aagye Apni maut ka Tamsha dekhne, ${name}`,
//         //     ]
//         //     // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
//         //     const randomFact = await generateRandomFact();
//         //     const randomMessage = `Hello!\n${randomFact}`;
//         //     if (lastKnownPresence == "composing") {
//         //         lastTyping[sender] = new Date().getTime();
//         //         console.log(chalk.greenBright.bold('[INFO] Sending Message: ' + randomMessage));
//         //         const s = await sock.sendMessage(id, { text: randomMessage });
//         //         console.log(chalk.greenBright.bold('[INFO] Message Sent: ' + JSON.stringify(s, null, 2)));
//         //     }
//         // } else if (lastKnownPresence == "composing") {
//         //     console.log(chalk.greenBright.bold('[INFO] Last reply was less than 1 hour ago'));
//         //     lastTyping[sender] = new Date().getTime();
//         // }
//       }
//     }

//     if (events['message-receipt.update']) {
//       const receipt = events['message-receipt.update'];
//       console.log(
//         chalk.greenBright.bold(
//           '[INFO] message-receipt.update: ' + JSON.stringify(receipt, null, 2),
//         ),
//       );
//     }

//     if (events['messages.upsert']) {
//       const upsert = events['messages.upsert'];
//       if (upsert.type !== 'notify') {
//         console.log(
//           chalk.greenBright.bold(
//             '[INFO] Chats update: Message not notify ' +
//               JSON.stringify(upsert, null, 2),
//           ),
//         );
//         return;
//       }
//       for (const msg of upsert.messages) {
//         const chat: proto.IWebMessageInfo = msg;
//         const userMessage = chat.message!.extendedTextMessage
//           ? chat.message.extendedTextMessage.text
//           : chat.message.conversation;
//         console.log(
//           chalk.greenBright.bold('[INFO] Chats Message: ' + userMessage),
//         );

//         const messageInstance: BotsApp = resolve(chat, sock);
//         if (userMessage.startsWith('!score')) {
//           console.log(
//             chalk.greenBright.bold('[INFO] Chats update: ' + userMessage),
//           );
//           const type =
//             userMessage.split('--').length > 1
//               ? messageInstance.body.split('--')[1].split(' ')[0]
//               : 'upcoming';
//           const scoreText = await getScore(type);
//           await sock.sendMessage(
//             chat.key.remoteJid,
//             { text: scoreText },
//             { quoted: msg },
//           );
//           return;
//         } else if (!messageInstance.fromMe) {
//           if (
//             messageInstance.isDeleted &&
//             ((messageInstance.isGroup &&
//               deletedMsgEnabledGroups[messageInstance.chatId]) ||
//               messageInstance.chatId.includes('@s.whatsapp.net'))
//           ) {
//             console.log(chalk.redBright.bold(`[INFO] Message deleted.`));
//             console.log(JSON.stringify(messageInstance, null, 2));
//             // get deleted message from the database
//             const sender = messageInstance.sender;
//             const messageId = messageInstance.deletedMessageID;
//             console.log(
//               chalk.redBright.bold(`[INFO] Deleted message id: ${messageId}`),
//             );
//             const deletedMessage: proto.IWebMessageInfo =
//               await store.loadMessage(messageInstance.chatId, messageId);
//             if (!deletedMessage) {
//               console.log(
//                 chalk.redBright.bold(`[INFO] Deleted message not found.`),
//               );
//               return;
//             }
//             // forward the deleted message to the admin based on the message type
//             await sock.sendMessage(
//               messageInstance.chatId,
//               { forward: deletedMessage },
//               { quoted: deletedMessage },
//             );
//           }
//         } else if (
//           !chat.key.fromMe &&
//           chat.key.remoteJid.includes('@s.whatsapp.net')
//         ) {
//           if (afk.enabled) {
//             const time = getTimeDifference(new Date().getTime(), afk.lastseen);
//             const reactionMessage = {
//               react: {
//                 text: '😴', // use an empty string to remove the reaction
//                 key: chat.key,
//               },
//             };
//             const sentMsgr = await sock.sendMessage(
//               chat.key.remoteJid,
//               reactionMessage,
//             );
//             try {
//               await sock.sendMessage(
//                 chat.key.remoteJid,
//                 {
//                   text:
//                     'Pritam is offline right now.\nLast seen: ' +
//                     time +
//                     ' ago.',
//                 },
//                 { quoted: chat },
//               );
//             } catch (e) {
//               console.log(e);
//             }
//             return;
//           }
//         } else {
//           const userMessage = chat.message!.extendedTextMessage
//             ? chat.message.extendedTextMessage.text
//             : chat.message.conversation;
//           if (userMessage == '!afk') {
//             afk.enabled = !afk.enabled;
//             afk.lastseen = new Date().getTime();
//             await sock.sendMessage(
//               chat.key.remoteJid,
//               { text: `afk is ${afk.enabled ? 'enabled' : 'disabled'}` },
//               { quoted: chat },
//             );
//             return;
//           }
//           if (userMessage.includes('!del')) {
//             deletedMsgEnabledGroups[chat.key.remoteJid] =
//               deletedMsgEnabledGroups[chat.key.remoteJid] ? false : true;
//             await sock.sendMessage(
//               chat.key.remoteJid,
//               {
//                 text: `Deleted message logging is ${
//                   deletedMsgEnabledGroups[chat.key.remoteJid]
//                     ? 'enabled'
//                     : 'disabled'
//                 }`,
//               },
//               { quoted: chat },
//             );
//             return;
//           }
//           if (userMessage.startsWith('!wgpt')) {
//           }
//         }
//       }
//     }
//     if (events['group-participants.update']) {
//       const { id, participants, action } = events['group-participants.update'];
//       console.log(JSON.stringify(events['group-participants.update'], null, 2));
//       if (participants[0] === myID) {
//         if (action === 'promote') {
//           console.log(chalk.redBright.bold(`[INFO] Promoted to admin.`));
//           const groupMetadata = await sock.groupMetadata(id);
//           console.log(JSON.stringify(groupMetadata, null, 2));
//           const groupAdmins = groupMetadata.participants.filter(
//             (participant) => participant.admin === 'admin',
//           );
//           const groupSuperAdmins = groupMetadata.participants.filter(
//             (participant) => participant.admin === 'superadmin',
//           );
//           // demote all admins other than the bot and super admins
//           const nonSuperAdminsID = groupAdmins
//             .filter((admin) => admin.id !== myID)
//             .map((admin) => admin.id);

//           if (nonSuperAdminsID.length > 0) {
//             await sock.groupParticipantsUpdate(id, nonSuperAdminsID, 'demote');
//           }
//           if (
//             groupSuperAdmins.length === 0 ||
//             (groupSuperAdmins.length === 1 && groupSuperAdmins[0].id == myID)
//           ) {
//             await sock.sendMessage(id, {
//               text: 'Hah haah haaah!, Now i am the king of this group!',
//             });
//           }
//         }
//       }
//     }

//     if (events['messages.update']) {
//       console.log(JSON.stringify(events['messages.update'], null, 2));
//     }
//   });

//   return sock;
// }
// try {
//   startSock();
// } catch (error) {
//   console.log(error);
// }

// function getTimeDifference(startTimestamp: number, endTimestamp: number) {
//   const diff = Math.abs(endTimestamp - startTimestamp);
//   const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
//   const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   let output = '';
//   if (years > 0) output += `${years} year${years > 1 ? 's' : ''}`;
//   if (days > 0 && years === 0) output += `${days} day${days > 1 ? 's' : ''}`;
//   if (hours > 0 && days === 0 && years === 0)
//     output += `${output.length > 0 ? ' and ' : ''}${hours} hour${
//       hours > 1 ? 's' : ''
//     }`;
//   if (minutes > 0 && days === 0 && hours === 0 && years === 0)
//     output += `${output.length > 0 ? ' and ' : ''}${minutes} minute${
//       minutes > 1 ? 's' : ''
//     }`;
//   if (seconds > 0 && days === 0 && hours === 0 && minutes === 0 && years === 0)
//     output += `${output.length > 0 ? ' and ' : ''}${seconds} second${
//       seconds > 1 ? 's' : ''
//     }`;
//   if (output.split(', ').length === 2) {
//     const index = output.lastIndexOf(',');
//     output = output.substring(0, index) + ' and' + output.substring(index + 1);
//   }

//   return output.trim();
// }

import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: true,
    auth: state,
    version: [2, 2323, 4],
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        'connection closed due to ',
        lastDisconnect.error,
        ', reconnecting ',
        shouldReconnect,
      );
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('opened connection');
    }
  });
  sock.ev.on('messages.upsert', async (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    console.log('replying to', m.messages[0].key.remoteJid);
    await sock.sendMessage(m.messages[0].key.remoteJid!, {
      text: 'Hello there!',
    });
  });
}
// run in main file
connectToWhatsApp();
