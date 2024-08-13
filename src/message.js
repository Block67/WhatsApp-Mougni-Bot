const { Client, Buttons } = require('whatsapp-web.js');
const axios = require('axios');

// Fonction pour envoyer un message à un contact
function envoyerMessage(client, contact, message) {
    return client.sendMessage(contact, message);
}

// Fonction pour récupérer les badges disponibles depuis l'API de MOUGNI
async function fetchBadges() {
    try {
        const response = await axios.get('https://mougni.com/apiv2/public/api/event');
        return response.data.badges;
    } catch (error) {
        console.error('Erreur lors de la récupération des badges:', error);
        return [];
    }
}

// Fonction pour répondre automatiquement aux messages entrants
async function repondreAuto(message) {
    const texteRecu = message.body.toLowerCase().trim();

    let reponse;

    // Réponses pré-définies pour les requêtes courantes
    const reponses = {
        'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ? Nous offrons des services pour promouvoir des événements avec des badges personnalisés.',
        'aide': 'Voici les commandes disponibles:\n- Bonjour\n- Aide\n- Informations\n- Contact\n- Horaires\n- Feedback\n- Services\n- Badges disponibles',
        'informations': 'Nous sommes spécialisés dans la promotion d\'événements et la gestion des badges personnalisés. Comment pouvons-nous vous aider ?',
        'contact': 'Pour toute assistance, contactez-nous à l\'adresse suivante : contact@exemple.com. Nous sommes là pour vous.',
        'horaires': 'Nous sommes ouverts du lundi au vendredi, de 9h00 à 18h00. Comment pouvons-nous vous assister aujourd\'hui ?',
        'feedback': 'Nous apprécions vos retours ! Partagez vos commentaires pour nous aider à améliorer nos services.',
        'services': 'Nous offrons des services de promotion d\'événements avec des badges personnalisés pour donner plus de visibilité à vos événements. Souhaitez-vous plus d\'informations ?',
        'badges disponibles': 'Voici les badges disponibles pour les événements. Un instant, je vous montre...'
    };

    // Réponse personnalisée en fonction du texte du message
    if (reponses[texteRecu]) {
        reponse = reponses[texteRecu];
    } else {
        // Réponse par défaut pour les messages inconnus avec une touche d'humour
        reponse = 'Hmm, je ne suis pas sûr de comprendre. Peut-être pouvez-vous reformuler ou taper "Aide" pour voir ce que je peux faire pour vous ?';
    }

    try {
        if (texteRecu === 'badges disponibles') {
            // Récupération des badges disponibles
            const badges = await fetchBadges();

            if (badges.length > 0) {
                // Envoi des informations de chaque badge séparément
                for (const item of badges) {
                    let badgeMessage = `*Nom du badge:* ${item.badge.name}\n`;
                    badgeMessage += `*Lieu:* ${item.badge.location}\n`;
                    badgeMessage += `*Date:* du ${item.badge.start_date} au ${item.badge.end_date}\n`;
                    badgeMessage += `*Option:* ${item.badge.option}\n`;
                    badgeMessage += `*Image:* ${'https://mougni.com/apiv2/storage/app/public/' + item.badge.badge}\n\n`;

                    await message.reply(badgeMessage);
                }
            } else {
                await message.reply('Aucun badge disponible pour le moment.');
            }
        } else {
            await message.reply(`${reponse}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la réponse:', error);
    }
}

module.exports = {
    envoyerMessage,
    repondreAuto
};
