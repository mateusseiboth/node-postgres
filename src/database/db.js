const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;
const ssl = isProduction ? { rejectUnauthorized: false } : false;

let poolInstance = null;

const createDatabase = () => {
    const pool = new Pool({
        connectionString,
        ssl,
    });

    const start = () => {
        if (poolInstance) {
            // Se o pool já estiver ativo, retornar a instância existente
            return poolInstance;
        }
        console.log("[Database] Starting connection...");
        // Connect to database
        pool.connect((err) => {
            if (!err) {
                console.log('[Database] Connected to database');
                //resolve(); // Resolves the Promise when connected successfully
            } else {
                console.error('[Database] Error connecting to database', err);
                //reject(err); // Rejects the Promise in case of an error
            }
        });
        poolInstance = pool; // Armazena a instância do pool
        return pool;
    }

    function stop() {
        // Disconnect from database
        console.log('[Database] Disconnecting from database');
        pool.end();
    }

    return {
        start,
        stop
    };
};

module.exports = createDatabase;