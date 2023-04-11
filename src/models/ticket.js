const pool = require('../database/db');

const insertTicket = async (req, res) => {
   const {carro, vaga, tipo} = req.body;
    const query = {
    text: 'select inserir_ticket($1,$2,$3,$4)',
    values: [carro, vaga, tipo, true]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const encerraTicket = async (id) => {
  const query = {
    text: 'select encerrar_ticket($1)',
    values: [id]
  };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
  insertTicket, encerraTicket
};