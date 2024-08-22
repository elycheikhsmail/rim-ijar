const { Client } = require('pg'); 

const databaseUrl = "postgresql://testuser:testpassword@localhost:5432/testdb"; 
const defaultDatabaseUrl = "postgresql://testuser:testpassword@localhost:5432/postgres"; 

async function checkAndCreateDatabase() { 
    const client = new Client({
        connectionString: defaultDatabaseUrl
    });

    const databaseName = databaseUrl.split('/').pop(); // Extraire le nom de la base à partir de l'URL

    try {
        // Connexion à PostgreSQL
        await client.connect();

        // Vérifier si la base de données existe
        const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname='${databaseName}'`;
        const res = await client.query(checkDbQuery);

        if (res.rows.length > 0) {
            // Si la base de données existe, la supprimer
            console.log(`La base de données "${databaseName}" existe déjà. Suppression...`);
            await client.query(`DROP DATABASE ${databaseName}`);
            console.log(`Base de données "${databaseName}" supprimée.`);
        }

        // Créer la base de données
        await client.query(`CREATE DATABASE ${databaseName}`);
        console.log(`Base de données "${databaseName}" créée avec succès.`);

    } catch (err) {
        console.error('Erreur lors de la gestion de la base de données:', err);
    } finally {
        // Fermer la connexion à PostgreSQL
        await client.end();
    }
}

(async () => {
    await checkAndCreateDatabase();
})();
