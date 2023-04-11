const pool = require('../database/db');

const insertClient = async (client) => {
const { nome, cpf, telefone } = client;
  const query = {
    text: 'INSERT INTO cliente(nome, cpf, telefone) VALUES($1, $2, $3) RETURNING *',
    values: [nome, cpf, telefone]
  };
  const result = await pool.query(query);
  return result.rows[0];
};


const updateClient = async (client) => {
    const { nome, cpf, telefone, id } = client;
      const query = {
        text: "update cliente set nome = $1 ,  cpf=$2 , telefone=$3 where id=$4 RETURNING *",
        values: [nome, cpf, telefone, id]
      };
      const result = await pool.query(query);
      return result.rows[0];
    };

const deleteClient = async (id) => {
  const query = {
    text: 'delete from cliente where id=$1 RETURNING *',
    values: [id]
  };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    insertClient, deleteClient, updateClient
};