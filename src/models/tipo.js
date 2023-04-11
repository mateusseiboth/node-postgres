const pool = require('../database/db');

const insertTipo = async (tipo) => {
const { preco, descr } = tipo;
  const query = {
    text: 'INSERT INTO tipo(preco, descr) VALUES($1, $2) RETURNING *',
    values: [preco, descr]
  };
  const result = await pool.query(query);
  return result.rows[0];
};


const updateTipo = async (tipo) => {
    console.log(tipo);
    const { preco, descr, id } = tipo;
      const query = {
        text: "update tipo set preco = $1 ,  descr=$2 where id=$3 RETURNING *",
        values: [preco, descr, id]
      };
      const result = await pool.query(query);
      return result.rows[0];
    };

const deleteTipo = async (id) => {
  const query = {
    text: 'delete from tipo where id=$1 RETURNING *',
    values: [id]
  };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    insertTipo, deleteTipo, updateTipo
};