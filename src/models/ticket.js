//TODO Modificar pattern para Factory


const pool = require('../database/db');

const insertTicket = async(req, res) => {
    const { carro, vaga, tipo } = req.body;
    const query = {
        text: 'select inserir_ticket($1,$2,$3,$4)',
        values: [carro, vaga, tipo, true]
    };
    const result = await pool.query(query);
    return result.rows[0];
};

const listarTickets = async(req, res) => {
    const query = {
        text: `SELECT to_char(ticket.hora_entrada at time zone 'UTF-4', 'HH24:MI:SS') as hora_entrada,
    cliente.nome as nome_cliente, carro.placa as nome_placa, tipo.descr as tipo_vaga,
    tipo.preco as preco_tipo, ticket.vaga_id as id_vaga, ticket.id as ticket_id,
    coalesce(to_char(ticket.hora_saida at time zone 'UTF-4', 'HH24:MI:SS'), 
       'Não recuperado') as hora_saida, coalesce(total_pago, 0.0) as custo 
     FROM ticket 
    join tipo on tipo.id = ticket.tipo_id
    join carro on carro.id = ticket.carro_id
    join cliente on cliente.id = carro.cliente_id
    where ticket.estado = true`
    }
    const result = await pool.query(query);
    return result.rows;
}

const listarTicketsAll = async(req, res) => {
    const query = {
        text: `SELECT to_char(ticket.hora_entrada at time zone 'UTF-4', 'HH24:MI:SS') as hora_entrada,
    cliente.nome as nome_cliente, carro.placa as nome_placa, tipo.descr as tipo_vaga,
    tipo.preco as preco_tipo, ticket.vaga_id as id_vaga, ticket.id as ticket_id,
    coalesce(to_char(ticket.hora_saida at time zone 'UTF-4', 'HH24:MI:SS'), 
       'Não recuperado') as hora_saida, coalesce(total_pago, 0.0) as custo 
     FROM ticket 
    join tipo on tipo.id = ticket.tipo_id
    join carro on carro.id = ticket.carro_id
    join cliente on cliente.id = carro.cliente_id`
    }
    const result = await pool.query(query);
    return result.rows;
}

const encerraTicket = async(id) => {
    const query = {
        text: 'select encerrar_ticket($1)',
        values: [id]
    };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    insertTicket,
    encerraTicket,
    listarTickets,
    listarTicketsAll
};