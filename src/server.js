const createServer = () => {

    function start(app) {
        console.log('[SERVER] Starting...');
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`[SERVER] Server running on port ${PORT}`);
        });
        console.log('[SERVER] Done.');

    }
    return { start: start };
}

module.exports = createServer;