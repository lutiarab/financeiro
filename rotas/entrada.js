const express = require('express'); // Importar a fremework express
const router = express.Router(); // Criar um roteador
const entradaController = require('../controles/entradaController'); //Importa o controlador




//---------------------------------------------- Estoque de números -------------------------------------------------------------

// Definindo uma rota para obter todas as transações
router.get('/', entradaController.getAllEntrada);

//Definindo uma rota para adicionar uma nova transação
router.post('/', entradaController.addEntrada);

//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', entradaController.updateEntradaPut);

//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id', entradaController.updateEntradaPatch);

//Definindo uma rota para deletar uma transação
router.delete('/:id', entradaController.deleteEntrada);


//Exportando o roteador
module.exports = router;