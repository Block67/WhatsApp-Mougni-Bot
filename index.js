const { demarrerAPI } = require('./src/api.js');
const { planificateurTaches } = require('./src/programmeur.js');

// Remplace CONTACT par ton numéro de téléphone dans programmeur.js
(async () => {
    try {
        const client = await demarrerAPI();
        planificateurTaches(client);
    } catch (error) {
        console.log('Erreur dans index', error);
    }
})();
