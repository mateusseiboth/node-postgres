const UserModel = require('../models/user');

const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      username,
      password: hashedPassword
    };

    const result = await UserModel.insertUser(user);

    if (result.rowCount === 1) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      throw new Error('Unable to create user');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.authenticateUser = async (req, res) => {
  
  try {
    const { username, password } = req.body;
    const user = await UserModel.findUserByUsername(username);

    if (!user) {
      return res.status(401).send({
        "result": false,
        "content": "Usuário ou senha inválido",
    });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({
        "result": false,
        "content": "Usuário ou senha inválido",
    });
    }

    const payload = {id: user.id};

    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};