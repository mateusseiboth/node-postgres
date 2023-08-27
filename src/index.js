const createApp = require('./app');
const createServer = require('./server');

async function start() {
    try {
        const app = createApp();
        const application = await app.start();
        const server = createServer();
        server.start(application);
    } catch (err) {
        console.log(err)
    }
}

start();