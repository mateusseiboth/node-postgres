const createDatabase = require('../database/db');
const createModel = () => {
    function start() {
        const pool = createDatabase().start();
        const insert = async(client) => {
            const { nome, cpf, telefone } = client;
            const query = {
                text: 'INSERT INTO cliente(nome, cpf, telefone) VALUES($1, $2, $3) RETURNING *',
                values: [nome, cpf, telefone]
            };
            const result = await pool.query(query);
            return result.rows[0];
        };

        const list = async() => {
            const query = { text: 'select * from cliente' };
            const result = await pool.query(query);
            return result.rows;
        }

        const update = async(client) => {
            const { nome, cpf, telefone, id } = client;
            const query = {
                text: "update cliente set nome = $1 ,  cpf=$2 , telefone=$3 where id=$4 RETURNING *",
                values: [nome, cpf, telefone, id]
            };
            const result = await pool.query(query);
            return result.rows[0];
        };

        const deleta = async(id) => {
            const query = {
                text: 'delete from cliente where id=$1 RETURNING *',
                values: [id]
            };
            const result = await pool.query(query);
            return result.rows[0];
        }
        return {
            insert: insert,
            update: update,
            list: list,
            deleta: deleta
        }
    }
    return { start: start }
}


module.exports = createModel;