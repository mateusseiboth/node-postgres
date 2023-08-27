const express = require('express');
const app = express();
const cors = require('cors');
const createRouter = require('./routes/index');
const createDatabase = require('./database/db');

const createApp = () => {
    async function start() {
        console.log('[APP] Starting...')
        try {
            //permite o acesso a API de qualquer origem
            const corsOptions = {
                origin: function(origin, callback) {
                    callback(null, true);
                }
            };
            app.use(cors(corsOptions));
            app.use(express.json());

            const database = createDatabase();
            await database.start();

            const appBase = '/api/v1'
            const router = createRouter();
            app.use(appBase, router.start());

            return (app);
        } catch (err) {
            return (err);
        }
    }

    return { start: start };
}

module.exports = createApp;