const createDatabase = require('../database/db');

const createModel = () => {
    function start() {
        const pool = createDatabase().start();
        const insert = async(user) => {
            const { username, password } = user;
            const query = {
                text: 'INSERT INTO usuario(username, password) VALUES($1, $2) RETURNING *',
                values: [username, password]
            };
            const result = await pool.query(query);
            return result;
        };

        const findByUsername = async(username) => {
            const query = {
                text: 'SELECT * FROM usuario WHERE username = $1',
                values: [username]
            };
            const result = await pool.query(query);
            return result.rows[0];
        };
        return {
            insert: insert,
            findByUsername: findByUsername,
        }
    }
    return { start: start }
}


module.exports = createModel;