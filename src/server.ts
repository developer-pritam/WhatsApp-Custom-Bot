import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import * as fs from 'fs';

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(
    'auth_info_baileys1',
  );

  const sock = makeWASocket({
    // can provide additional config here
    auth: state,
    printQRInTerminal: true,
    // version: [2, 2413, 1],
    // lastDisconnect: {
    //   error: Error,
    //   date: Date,
    // },
  });
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
  sock.ev.on('creds.update', saveCreds);
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
