const pool = require('../database/db');

const insertVaga = async () => {
  const query = {
    text: 'INSERT INTO vaga(estado) VALUES($1) RETURNING *',
    values: [true]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const listarVagas = async () =>{
  const query ={
    text: 'select * from vaga'
  };
  const result = await pool.query(query);
  return result.rows;


};

const deleteVaga = async (id) => {
  const query = {
    text: 'delete from vaga where id=$1 RETURNING *',
    values: [id]
  };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
  insertVaga, deleteVaga, listarVagas
};