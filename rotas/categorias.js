const express = require('express'); // Importar a fremework express
const router = express.Router(); // Criar um roteador
const categoriasController = require('../controles/categoriasController'); //Importa o controlador

// const authMiddleware = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações
router.get('/', categoriasController.getAllCategorias);

//Definindo uma rota para adicionar uma nova transação
router.post('/', categoriasController.addCategorias);

//Definindo uma rota para atualizar uma trasação existente(substituição completa)
router.put('/:id', categoriasController.updateCategoriasPut);

//Definindo uma rota para atualizar uma trasação existente(substituição parcial)
router.patch('/:id', categoriasController.updateCategoriasPatch);

//Definindo uma rota para deletar uma transação
router.delete('/:id', categoriasController.deleteCategorias);




//Exportando o roteador
module.exports = router;