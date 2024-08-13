const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { repondreAuto } = require('./message.js');

async function demarrerAPI() {
    const client = new Client({
        authStrategy: new LocalAuth(),
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    // Événement pour les messages entrants
    client.on('message', async (message) => {
        await repondreAuto(message);
    });

    await client.initialize();

    return client;
}

module.exports = {
    demarrerAPI,
};
