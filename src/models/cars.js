const pool = require('../database/db');

const insertCar = async (car) => {
const { placa, cliente_id } = car;
  const query = {
    text: 'INSERT INTO carro(placa, cliente_id) VALUES($1, $2) RETURNING *',
    values: [placa, cliente_id]
  };
  const result = await pool.query(query);
  return result.rows[0];
};


const updateCar = async (car) => {
    const { placa, cliente_id, id } = car;
      const query = {
        text: "update carro set placa = $1 ,  cliente_id=$2 where id=$3 RETURNING *",
        values: [placa, cliente_id, id]
      };
      const result = await pool.query(query);
      return result.rows[0];
    };

const deleteCar = async (id) => {
  const query = {
    text: 'delete from carro where id=$1 RETURNING *',
    values: [id]
  };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    insertCar, deleteCar, updateCar
};