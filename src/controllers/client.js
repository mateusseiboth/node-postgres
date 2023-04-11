const Client = require('../models/cars');

const createClient = async (req, res, next) => {
  try {
    const client = req.body;
    const newClient = await Client.insertClient(client);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { createClient };