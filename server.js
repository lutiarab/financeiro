const dotenv = require('dotenv'); // Importar o pacote dontev para gerenciar variáveis de abiente

// Configurar as variáveis de ambiente

dotenv.config(); // Carrega as variáveis definidas no arquivo '.env' para process.env (processos)

//Importar as bibliotecas

const express = require('express'); // Importa a fremework express
const cors = require('cors'); // Importa o pacote cors para permitir requisições de diferentes origens

const dados = require('./configurar/dados'); // Importa a conexão com o banco de dados

// Inicializar nova aplicação Express

const app = express(); // Inicializar uma nova aplicação Express

// Configurar o CORS e o BADY-PARSE

app.use(cors()); // Habilita o CORS para todas as rotas
app.use(bodyparser.json()); // Configura o BODY-PARSER para analisar requisições JSON

//Usar as rotas de TRANSAÇÕES e AUTENTICAÇÕES para as requisições