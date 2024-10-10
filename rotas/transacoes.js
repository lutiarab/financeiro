const express = require('express'); // Importar a fremework express
const router = express.Router(); // Criar um roteador
const transacoesController = require('../controles/transacoesController'); //Importa o controlador




//---------------------------------------------- Estoque de números -------------------------------------------------------------

// Definindo uma rota para obter todas as transações
router.get('/', transacoesController.getAllTransacoes);

//Definindo uma rota para adicionar uma nova transação
router.post('/', transacoesController.addTransacoes);

//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', transacoesController.updateTransacoesPut);

//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id', transacoesController.updateTransacoesPatch);

//Definindo uma rota para deletar uma transação
router.delete('/:id', transacoesController.deleteTransacoes);


//Exportando o roteador
module.exports = router;