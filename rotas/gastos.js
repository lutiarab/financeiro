const express = require('express'); // Importar a fremework express
const router = express.Router(); // Criar um roteador
const gastosController = require('../controles/gastosController'); //Importa o controlador




//---------------------------------------------- Estoque de números -------------------------------------------------------------

// Definindo uma rota para obter todas as transações
router.get('/', gastosController.getAllGastos);

//Definindo uma rota para adicionar uma nova transação
router.post('/', gastosController.addGastos);

//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', gastosController.updateGastosPut);

//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id', gastosController.updateGastosPatch);

//Definindo uma rota para deletar uma transação
router.delete('/:id', gastosController.deleteGastos);


//Exportando o roteador
module.exports = router;