const express = require('express'); // Importar a fremework express
const router = express.Router(); // Criar um roteador
const saidasController = require('../controles/saidasController'); //Importa o controlador

// const authMiddleware = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações
router.get('/', saidasController.getAllSaidas);

//Definindo uma rota para adicionar uma nova transação
router.post('/', saidasController.addSaidas);

//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', saidasController.updateSaidasPut);

//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id', saidasController.updateSaidasPatch);

//Definindo uma rota para deletar uma transação
router.delete('/:id', saidasController.deleteSaidas);




//Exportando o roteador
module.exports = router;