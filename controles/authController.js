const crypto = require('crypto');
const dados = require('../configurar/dados'); // Importa a configuração do banco de dados 
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar senhas 
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken para gerar tokens JWT 
const sendEmail = require('../services/emailService').sendEmail; 

// Função para registrar um novo usuário 

const registerClientes = async (req, res) => {
    const { name, email, senha, data_aniversario } = req.body; // Desestrutura os dados do corpo da requisição 

    // Verificar se o usuário já existe no banco de dados

    try {
        const [existingClientes] = await dados.promise().query('SELECT * FROM clientes WHERE email = ?', [email]); 
            
             if (existingClientes.length > 0) { 
             return res.status(400).send('Usuário já registrado');
            }

            // Criptografar a senha usando bcrypt 

            const hashedSenha = await bcrypt.hash(senha, 10); 

            // Inserir o novo usuário no banco de dados
            
            await dados.promise().query( 
            'INSERT INTO clientes (name, email, senha, data_aniversario) VALUES (?, ?, ?, ?)', 
            [name, email, hashedSenha, data_aniversario]  );
            

            res.status(201).send('Usuário registrado com sucesso'); 
            } catch (err) { 
            console.error('Erro ao registrar usuário:', err); 
            res.status(500).send('Erro ao registrar usuário'); 
    }
}; 



// Função para autenticar um usuário 

const loginClientes = async (req, res) => { 
    const { email, senha } = req.body; // Desestrutura os dados do corpo da requisição 
   
    // Verificar se o usuário existe no banco de dados 
    try { 
    const [clientes] = await dados.promise().query('SELECT * FROM clientes WHERE email = ?', [email]); 
    if (clientes.length === 0) { 
    return res.status(400).send('Credenciais inválidas'); 
    } 
   
    // Comparar a senha fornecida com a senha criptografada no banco de dados 
    const isMatch = await bcrypt.compare(senha, clientes[0].senha); 
    if (!isMatch) { 
    return res.status(400).send('Credenciais inválidas'); 
    } 
   
    // Gerar um token JWT 
    const token = jwt.sign({ clientesId: clientes[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.json({ token }); 
    } catch (err) { 
    console.error('Erro ao autenticar usuário:', err); 
    res.status(500).send('Erro ao autenticar usuário'); 
    } 
   }; 



// Função para solicitar redefinição de senha
const requestSenhaReset = async (req, res) => {
    const { email } = req.body;
    try {
        const [Clientes] = await dados.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);
        if (Clientes.length === 0) {
        return res.status(404).send('Usuário não encontrado');
        } 

        const token = crypto.randomBytes(20).toString('hex'); // Gera um token aleatório
        const expireDate = new Date(Date.now() + 3600000); // 1 hora para expiração
        await dados.promise().query('UPDATE clientes SET reset_senha_token = ?, reset_senha_expires = ? WHERE email = ?', [token, expireDate, email]);
        const resetLink = `http://localhost:3000/reset-senha/${token}`; // Link para redefinição de senha

        sendEmail(email, 'Recuperação de Senha - Sistema de Gerenciamento Finance SENAI', `Por favor, clique no link para redefinir sua senha: ${resetLink}`);
        res.send('E-mail de recuperação de senha enviado');
        } catch (err) {
        console.error('Erro ao solicitar redefinição de senha:', err);
        res.status(500).send('Erro ao solicitar redefinição de senha');
        
    }
};


// Função para redefinir a senha
const resetSenha = async (req, res) => {
    const { token, novaSenha } = req.body;
    try {
        const [Clientes] = await dados.promise().query('SELECT * FROM clientes WHERE reset_senha_token = ? AND reset_senha_expires > NOW()', [token]);
        if (Clientes.length === 0) {
        return res.status(400).send('Token inválido ou expirado');
        } 

        const hashedSenha = await bcrypt.hash(novaSenha, 10); // Criptografa a nova senha
        await dados.promise().query('UPDATE clientes SET senha = ?, reset_senha_token = NULL, reset_senha_expires = NULL WHERE id = ?', [hashedSenha, Clientes[0].id]);
        res.send('Senha redefinida com sucesso');
        } catch (err) {
        console.error('Erro ao redefinir senha:', err);
        res.status(500).send('Erro ao redefinir senha');
    }
};

module.exports = {
    registerClientes,
    loginClientes,
    requestSenhaReset,
    resetSenha
};