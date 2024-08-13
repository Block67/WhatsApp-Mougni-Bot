const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { repondreAuto } = require('./message.js');
const fs = require('fs');

let contacts = new Set(); // Utilisation d'un Set pour éviter les doublons

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
        const contact = await message.getContact();
        const phoneNumber = contact.number;

        // Ajoute du numéro de téléphone au Set
        contacts.add(phoneNumber);

        // Ajout du numéro de téléphone dans un fichier texte
        fs.appendFileSync('contacts.txt', phoneNumber + '\n', 'utf8');

        console.log(`Nouvelle interaction avec le numéro : ${phoneNumber}`);
        console.log('Liste des contacts qui ont interagi avec le bot :', Array.from(contacts));

        await repondreAuto(message);
    });

    await client.initialize();

    return client;
}

module.exports = {
    demarrerAPI,
};
