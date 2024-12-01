 const express = require('express'); // Importa o framework Express 
 const router = express.Router(); // Cria um novo roteador 
 const authController = require('../controles/authController'); // Importa o controlador de autenticação 

//rota para obter todos os cadastros
 router.get('/',authController.verClientes)
 // Rota para registro de usuário 
 router.post('/register', authController.registerClientes); 

 // Rota para login de usuário 
 router.post('/login', authController.loginClientes); 

 // Rota para solicitar redefinição de senha
 router.post('/request-senha-reset', authController.requestSenhaReset);

 // Rota para redefinir a senha
 router.post('/reset-senha', authController.resetSenha); 


 module.exports = router; // Exporta o roteador