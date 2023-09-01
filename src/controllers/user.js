const createModel = require('../models/model');
const model = createModel();

const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const createController = () => {
    function validar(username, password, id, method) {
        let message = [];
        try {
            if (!username || username === '' || username === null || username === undefined) {
                message.push('Nome de usuário não informado');
            }
            if (!password || password === '' || password === null || password === undefined) {
                message.push('Senha não informada');
            }
            if (method === 'update') {
                if (!id || id === '' || id === null || id === undefined) {
                    message.push('ID não informado');
                }
            }
            if (message.length > 0) {
                throw new Error(message)
            } else {
                return true;
            }
        } catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }

    function start() {
        const create = async(req, res) => {
            try {
                //Valida os dados enviados
                const { username, password } = req.body;
                validar(username, password, null, 'create');

                //Cria o objeto do usuário com bycript na senha
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const user = {
                    username,
                    password: hashedPassword
                };
                //Chama a function para inserir no banco
                const result = await model.start('usuario', 'create', user);
                if (result.rowCount === 1) {
                    res.status(201).json({
                        "result": true,
                        "content": "Usuário inserido com sucesso",
                        "tipo": "success",
                        "message": "Usuário inserido com sucesso"
                    });
                } else {
                    throw new Error('Não foi possível criar o usuário');
                }
            } catch (err) {
                res.status(400).json({
                    "result": true,
                    "content": "Erro ao inserir usuário",
                    "tipo": "error",
                    "message": err.message
                });
            }
        };
        const renewToken = async(user, res) => {
            try {
                const payload = { id: user.id };
                const token = generateToken(payload);
                res.status(200).json({ token });
            } catch (err) {
                console.log(err.message)
                res.status(400).json({
                    "result": true,
                    "content": "Erro ao inserir usuário",
                    "tipo": "error",
                    "message": err.message
                })
            }
        }
        const authenticateUser = async(req, res) => {
            try {
                //Valida os dados enviados
                const { username, password } = req.body;
                validar(username, password, null, 'authenticate');
                //Verifica se encontrou um usuário com o username informado
                const user = await model.start('usuario', 'findBy', { username: username });
                if (!user) {
                    return res.status(401).send({
                        "result": false,
                        "content": "Usuário ou senha inválido",
                        "tipo": "error",
                        "message": "Usuário ou senha inválido"
                    });
                }
                //Verifica se a senha está correta 
                const isPasswordValid = await bcrypt.compare(password, user[0].password);
                if (!isPasswordValid) {
                    res.status(401).send({
                        "result": false,
                        "content": "Usuário ou senha inválido",
                        "tipo": "error",
                        "message": "Usuário ou senha inválido"
                    });
                }
                //Cria o token
                const payload = { id: user.id };
                const token = generateToken(payload);
                res.status(200).json({ token });
            } catch (err) {
                res.status(400).json({
                    "result": false,
                    "content": err.message,
                    "tipo": "error",
                    "message": err.message
                });
            }
        };

        return {
            create: create,
            renewToken: renewToken,
            authenticateUser: authenticateUser,
        }
    }
    return {
        start: start
    }
}

module.exports = createController;