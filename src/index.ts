import chalk from 'chalk'
console.log(chalk.greenBright.bold('[INFO] Bot Start!!!'));
import makeWASocket, { MessageRetryMap, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, WASocket, proto, Contact } from '@adiwajshing/baileys'
import { useRemoteFileAuthState } from './core/dbAuth.js'
const msgRetryCounterMap: MessageRetryMap = {};
import P, { Logger } from 'pino'
import { Boom } from '@hapi/boom'
import { Sequelize } from 'sequelize/types'
import config from './config'
const sequelize: Sequelize = config.DATABASE;
import resolve from './core/helper.js';
import BotsApp from './core/sidekick.js';
import { downloadContentFromMessage } from "@adiwajshing/baileys";

const logger: Logger = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` }).child({})
logger.level = 'fatal'
const store = makeInMemoryStore({ logger })

store?.readFromFile('./session.data.json')
// save every 10s
setInterval(() => {
    store?.writeToFile('./session.data.json')
}, 10_000);
const users = {
    917982975985: "Sadhvi",
    918882612206: "Muskan",
    918168265013: "Aman",
    919210943308: "Div",
    917042275334: "Srishti",
    917011411568: "Pritam"
}

const deletedMsgEnabledGroups = {
    ['120363047042799281@g.us']: true,
}
const muskanId = '918882612206@s.whatsapp.net'
const hackID = '120363047042799281@g.us'


const myID = "917531813068@s.whatsapp.net"


function getTimeDifference(startTimestamp: number, endTimestamp: number) {
    const diff = Math.abs(endTimestamp - startTimestamp);
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) % 365);
    const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(diff / (1000 * 60) % 60);
    const seconds = Math.floor(diff / 1000 % 60);

    let output = "";
    if (years > 0) output += `${years} year${years > 1 ? 's' : ''}`;
    if (days > 0 && years === 0) output += `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0 && days === 0 && years === 0) output += `${output.length > 0 ? ' and ' : ''}${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0 && days === 0 && hours === 0 && years === 0) output += `${output.length > 0 ? ' and ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
    if (seconds > 0 && days === 0 && hours === 0 && minutes === 0 && years === 0) output += `${output.length > 0 ? ' and ' : ''}${seconds} second${seconds > 1 ? 's' : ''}`;
    if (output.split(', ').length === 2) {
        const index = output.lastIndexOf(',');
        output = output.substring(0, index) + ' and' + output.substring(index + 1);
    }

    return output.trim();
}

let taskScheduled = false;
function scheduleTaskAtTime(task: { (): Promise<void>; (): Promise<void>; (): void; }, time: number) {
    const currentTime = new Date().getTime();
    const delay = time - currentTime;
    if (delay < 0) {
        return; // If the scheduled time has already passed, don't schedule the task
    }
    setTimeout(task, delay);
}

const afk = {
    enabled: true,
    lastseen: new Date().getTime(),
}

async function startSock() {
    console.log(chalk.greenBright.bold('[INFO] Sock Start'));

    try {
        await sequelize.authenticate();
        console.log(chalk.greenBright.bold('[INFO] Connection has been established successfully.'));
    } catch (error) {
        console.error('[ERROR] Unable to connect to the database:', error);
    }
    console.log(chalk.yellowBright.bold("[INFO] Syncing Database..."));
    await sequelize.sync();
    console.log(chalk.greenBright.bold("[INFO] All models were synchronized successfully."));

    const { state, saveCreds } = await useRemoteFileAuthState();
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const sock: WASocket = makeWASocket({
        logger,
        version,
        printQRInTerminal: true,
        browser: ["PritamBot", "Chrome", "4.0.0"],
        auth: state,
        msgRetryCounterMap,
        // implement to handle retries
        getMessage: async key => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid!, key.id!)
                return msg?.message || undefined
            }
            return {
                conversation: '-pls ignore-'
            }
        }

    });
    store?.bind(sock.ev);


    sock.ev.process(
        async (events) => {


            if (events['connection.update']) {



                const update = events['connection.update'];

                // console.log(chalk.greenBright.bold('[INFO] Connection update: ' + JSON.stringify(update, null, 2) + ''));

                const { connection, lastDisconnect } = update;
                if (connection === 'close') {
                    if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                        startSock()
                    } else {
                        console.log(chalk.redBright('Connection closed. You are logged out. Delete the BotsApp.db and session.data.json files to rescan the code.'));
                        process.exit(0);
                    }
                } else if (connection === 'connecting') {
                    console.log(chalk.yellowBright("[INFO] Connecting to WhatsApp..."));
                } else if (connection === 'open') {
                    console.log(chalk.greenBright.bold("[INFO] Connected! Welcome to BotsApp"));

                    // if (!taskScheduled) {
                    //     taskScheduled = true;
                    //     async function muskanDm() {
                    //         await sock.sendMessage(muskanId, { text: "Happy birthday, Muskan! On your special day, I wish you all the happiness and joy that you deserve. You are an amazing person and an incredible friend, and I feel blessed to have you in my life. May this year bring you success in all your endeavors and may you be surrounded by love and positivity always. Cheers to another year of making beautiful memories together! Enjoy your day to the fullest and have a wonderful year ahead!🎂🎉" })
                    //     }
                    //     async function groupMessage() {
                    //         await sock.sendMessage(hackID, { text: "-gpt Happy birthday muski-phuski🎉🎉🎂[AUTOMATED MESSAGE]" })
                    //         await sock.sendMessage(hackID, { text: "-gpt Write a beautiful Happy birthday message for Muskan.[AUTOMATED MESSAGE]" })

                    //     }
                    //     const scheduledDate = new Date('2023-03-24T11:50:00.000+05:30')
                    //     // const scheduledDate1 = new Date('2023-03-23T100:00:00.000+05:30')
                    //     // scheduleTaskAtTime(muskanDm, scheduledDate1.getTime());
                    //     scheduleTaskAtTime(groupMessage, scheduledDate.getTime());

                    //     console.log("TASK SCHEDULED");
                    //     console.log("TASK SCHEDULED");
                    //     console.log("TASK SCHEDULED");
                    //     console.log("TASK SCHEDULED");
                    //     console.log("TASK SCHEDULED");


                    // }
                }
            }

            if (events['creds.update']) {
                await saveCreds()
            }

            if (events['contacts.upsert']) {
                const contacts: Contact[] = events['contacts.upsert'];
                const contactsUpdate = (newContacts: Contact[]) => {
                    for (const contact of newContacts) {
                        if (store.contacts[contact.id]) {
                            Object.assign(store.contacts[contact.id], contact);
                        } else {
                            store.contacts[contact.id] = contact;
                        }
                    }
                    return;
                };

                contactsUpdate(contacts);
            }

            if (events['contacts.upsert']) {
                const contacts: Contact[] = events['contacts.upsert'];
                const contactsUpdate = (newContacts: Contact[]) => {
                    for (const contact of newContacts) {
                        if (store.contacts[contact.id]) {
                            Object.assign(store.contacts[contact.id], contact);
                        } else {
                            store.contacts[contact.id] = contact;
                        }
                    }
                    return;
                };

                contactsUpdate(contacts);
            }
            if (events['messages.upsert']) {
                const upsert = events['messages.upsert'];
                if (upsert.type !== 'notify') {
                    return;
                }
                for (const msg of upsert.messages) {
                    const chat: proto.IWebMessageInfo = msg;
                    const messageInstance: BotsApp = resolve(chat, sock);
                    if (!messageInstance.fromMe) {
                        if (messageInstance.isDeleted && (messageInstance.isGroup && deletedMsgEnabledGroups[messageInstance.chatId] || messageInstance.chatId.includes('@s.whatsapp.net'))) {
                            console.log(chalk.redBright.bold(`[INFO] Message deleted.`));
                            console.log(JSON.stringify(messageInstance, null, 2));
                            // get deleted message from the database
                            const sender = messageInstance.sender;
                            const messageId = messageInstance.deletedMessageID;
                            console.log(chalk.redBright.bold(`[INFO] Deleted message id: ${messageId}`));
                            const deletedMessage: proto.IWebMessageInfo = await store.loadMessage(messageInstance.chatId, messageId);
                            if (!deletedMessage) {
                                console.log(chalk.redBright.bold(`[INFO] Deleted message not found.`));
                                return
                            }
                            // const deletedMessageBA: BotsApp = resolve(deletedMessage, sock);
                            // forward the deleted message to the admin based on the message type
                            await sock.sendMessage(messageInstance.chatId, { forward: deletedMessage }, { quoted: deletedMessage, });

                            // if (deletedMessageBA.isTextReply) {
                            //     await sock.sendMessage(messageInstance.chatId,
                            //         {
                            //             text: `From: @${deletedMessageBA.sender.replace('@s.whatsapp.net', "")}\n*Message:* ${deletedMessageBA.body}\n*Reply message:* ${deletedMessageBA.replyMessage}`,
                            //             mentions: [deletedMessageBA.sender]
                            //         }
                            //         , { quoted: deletedMessage }
                            //     )
                            // } else if (!deletedMessageBA.isTextReply && !deletedMessageBA.isImage) {
                            //     await sock.sendMessage(
                            //         messageInstance.chatId,
                            //         {
                            //             text: `*From:* @${deletedMessageBA.sender.replace('@s.whatsapp.net', "")}\n*Message:* ${deletedMessageBA.body}`,
                            //             mentions: [deletedMessageBA.sender]
                            //         }
                            //         , { quoted: deletedMessage })

                            // }
                            //  else if (deletedMessageBA.isImage || deletedMessageBA.isGIF || deletedMessageBA.isVideo) {
                            //     var replyChatObject = {
                            //         message: (deletedMessageBA.type === 'image' ? chat.message.imageMessage : chat.message.videoMessage),
                            //         type: deletedMessageBA.type === 'image' ? 'image' : 'video',
                            //     };
                            //     var imageId: string = chat.key.id;
                            //     const media = await downloadContentFromMessage(replyChatObject.message, replyChatObject.type === "image" ? "image" : "video");
                            //     console.log(JSON.stringify(media, null, 2), "deleted media")
                            // }
                        }
                    } else if (!chat.key.fromMe && chat.key.remoteJid.includes("@s.whatsapp.net")) {

                        if (afk.enabled) {
                            const time = getTimeDifference(new Date().getTime(), afk.lastseen);
                            const reactionMessage = {
                                react: {
                                    text: "😴", // use an empty string to remove the reaction
                                    key: chat.key
                                }

                            }
                            const sentMsgr = await sock.sendMessage(chat.key.remoteJid, reactionMessage)
                            try {
                                await sock.sendMessage(chat.key.remoteJid, { text: "Pritam is offline right now.\nLast seen: " + time + " ago." }, { quoted: chat })
                            }
                            catch (e) {
                                console.log(e)
                            }
                            return
                        }





                    }
                    else {
                        const userMessage = chat.message!.extendedTextMessage ? chat.message.extendedTextMessage.text : chat.message.conversation
                        if (userMessage == "!afk") {
                            afk.enabled = !afk.enabled
                            afk.lastseen = new Date().getTime();
                            await sock.sendMessage(chat.key.remoteJid, { text: `afk is ${afk.enabled ? "enabled" : "disabled"}` }, { quoted: chat })
                            return
                        } if (userMessage.includes("!del")) {
                            deletedMsgEnabledGroups[chat.key.remoteJid] = deletedMsgEnabledGroups[chat.key.remoteJid] ? false : true;
                            await sock.sendMessage(chat.key.remoteJid, { text: `Deleted message logging is ${deletedMsgEnabledGroups[chat.key.remoteJid] ? "enabled" : "disabled"}` }, { quoted: chat })
                            return
                        }

                    }


                }
            }
            if (events['group-participants.update']) {

                const { id, participants, action } = events['group-participants.update'];
                console.log(JSON.stringify(events['group-participants.update'], null, 2))

                if (participants[0] === myID) {

                    if (action === "promote") {
                        console.log(chalk.redBright.bold(`[INFO] Promoted to admin.`));
                        const groupMetadata = await sock.groupMetadata(id);
                        console.log(JSON.stringify(groupMetadata, null, 2))
                        const groupAdmins = groupMetadata.participants.filter((participant) => participant.admin === "admin");
                        const groupSuperAdmins = groupMetadata.participants.filter((participant) => participant.admin === "superadmin");
                        // demote all admins other than the bot and super admins
                        const nonSuperAdminsID = groupAdmins.filter((admin) => admin.id !== myID).map((admin) => admin.id);

                        if (nonSuperAdminsID.length > 0) {
                            await sock.groupParticipantsUpdate(
                                id,
                                nonSuperAdminsID,
                                "demote"
                                // replace this parameter with "remove", "demote" or "promote"
                            )
                        }
                        if (groupSuperAdmins.length === 0 || (groupSuperAdmins.length === 1 && groupSuperAdmins[0].id == myID)) {
                            await sock.sendMessage(id, { text: "Hah haah haaah!, Now i am the king of this group!" });
                        }

                        // console.log(JSON.stringify(groupMetadata, null, 2));
                        // ev.on(, ({ id, participants, action }) => {
                        //     const metadata = groupMetadata[id];
                        //     if (metadata) {
                        //         switch (action) {
                        //             case 'add':
                        //                 metadata.participants.push(...participants.map(id => ({ id, isAdmin: false, isSuperAdmin: false })));
                        //                 break;
                        //             case 'demote':
                        //             case 'promote':
                        //                 for (const participant of metadata.participants) {
                        //                     if (participants.includes(participant.id)) {
                        //                         participant.isAdmin = action === 'promote';
                        //                     }
                        //                 }
                        //                 break;
                        //             case 'remove':
                        //                 metadata.participants = metadata.participants.filter(p => !participants.includes(p.id));
                        //                 break;
                        //         }
                        //     }
                        // });
                    }
                }
            }
        }
    );

    return sock;
}
try {
    startSock()

} catch (error) {
    console.log(error)
}