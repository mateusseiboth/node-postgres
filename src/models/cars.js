const createDatabase = require('../database/db');

const createModel = () => {
    function start() {
        const pool = createDatabase().start();
        async function insert(car) {
            const { placa, cliente_id } = car;
            const query = {
                text: 'INSERT INTO carro(placa, cliente_id) VALUES($1, $2) RETURNING *',
                values: [placa, cliente_id]
            };
            try {
                const result = await pool.query(query);
                return result.rows[0];
            } catch (err) {
                throw new Error(err.message);
            }
        };

        const list = async() => {
            const query = {
                text: `select car.id id, car.placa placa, car.cliente_id cliente_id, cli.nome as cliente_nome 
        from carro car
        left join cliente cli
        on cli.id = car.cliente_id`,

            };
            const result = await pool.query(query);
            return result.rows;
        };

        const update = async(car) => {
            const { placa, cliente_id, id } = car;
            const query = {
                text: "update carro set placa = $1 ,  cliente_id=$2 where id=$3 RETURNING *",
                values: [placa, cliente_id, id]
            };
            const result = await pool.query(query);
            return result.rows[0];
        };

        const deleta = async(id) => {
            const query = {
                text: 'delete from carro where id=$1 RETURNING *',
                values: [id]
            };
            const result = await pool.query(query);
            return result.rows[0];
        }

        return {
            list: list,
            update: update,
            deleta: deleta,
            insert: insert,
        }
    }
    return { start: start };
}

module.exports = createModel;