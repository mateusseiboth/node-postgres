const createDatabase = require("../database/db");

const createModel = () => {
    async function start(tabela, metodo, objeto) {
        const pool = createDatabase().start();
        async function create() {
            const keys = Object.keys(objeto);
            const values = Object.values(objeto);

            const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');
            const query = {
                text: `INSERT INTO ${tabela}(${keys.join(', ')}) VALUES(${placeholders}) RETURNING *`,
                values: values,
            };
            console.log(query);
            const result = await pool.query(query);
            console.log(result)
            return result.rows[0];
        };
        async function find() {
            const query = {
                text: `select * from ${tabela}`,
            };
            console.log(query);
            const result = await pool.query(query);
            console.log(result.rows)
            return result.rows
        };
        async function deleta() {
            const values = Object.values(objeto);
            const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');
            const query = {
                text: `delete from ${tabela} where id = (${placeholders}) RETURNING *`,
                values: values,
            };
            console.log(query);
            const result = await pool.query(query);
            console.log(result.rows)
            return result.rows
        };
        async function update() {
            const keys = Object.keys(objeto);
            const values = Object.values(objeto);
            const id = objeto.id; // Supondo que o ID esteja contido no objeto
            // Filtrar as chaves, valores e placeholders para remover o ID
            const filteredKeys = keys.filter(key => key !== 'id');
            const filteredValues = values.filter((value, index) => keys[index] !== 'id');

            const setClause = filteredKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            const query = {
                text: `UPDATE ${tabela} SET ${setClause} WHERE id = $${filteredValues.length + 1} RETURNING *`,
                values: [...filteredValues, id],
            };

            console.log(query);
            const result = await pool.query(query);
            console.log(result)
            return result.rows;
        };

        async function findBy() {
            const keys = Object.keys(objeto);
            const values = Object.values(objeto);
            const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
            const query = {
                text: `SELECT * FROM ${tabela} WHERE ${conditions}`,
                values: values,
            };
            console.log(query);
            const result = await pool.query(query);
            console.log(result.rows)
            return result.rows
        };

        const methods = {
            create: create,
            find: find,
            deleta: deleta,
            update: update,
            findBy: findBy,

            // Adicione outras funções internas aqui
        };

        if (typeof methods[metodo] === 'function') {
            return methods[metodo](); // Chama a função utilizando o nome do método passado
        } else {
            throw new Error('Método não encontrado!');
            console.log('Método não encontrado!');
        }
    }

    return { start: start };
}

module.exports = createModel;