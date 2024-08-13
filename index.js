const { demarrerAPI } = require('./src/api.js');
const { planificateurTaches } = require('./src/programmeur.js');

(async () => {
    try {
        const client = await demarrerAPI();
        planificateurTaches(client);
    } catch (error) {
        console.log('Erreur dans index', error);
    }
})();
