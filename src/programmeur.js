const cron = require('node-cron');
const { envoyerMessage } = require('./message.js');

const CONTACT = '22941438809@c.us';
const MSG_SALUTATIONS = [
    'Bonjour',
    'Bonjour, comment vous êtes-vous réveillé ?',
    'Bonjour, comment allez-vous ?',
    'Bonjour, comment ça va ?',
];

function planificateurTaches(client) {
    const horaire = '0 43 17 * * *'; // Planification à 17h43
    if (cron.validate(horaire)) {
        console.log('Cron initialisé');
        cron.schedule(horaire, async () => {
            try {
                const salutation = MSG_SALUTATIONS[Math.floor(Math.random() * MSG_SALUTATIONS.length)];
                await envoyerMessage(client, CONTACT, salutation);
                console.log('Message envoyé');
            } catch (error) {
                console.log('Erreur dans le cron', error);
            }
        });
    }
}


module.exports = {
    planificateurTaches,
};
