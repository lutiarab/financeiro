const dotenv = require('dotenv'); // Importar o pacote dontev para gerenciar variáveis de abiente

// Configurar as variáveis de ambiente

dotenv.config(); // Carrega as variáveis definidas no arquivo '.env' para process.env (processos)

//Importar as bibliotecas

const express = require('express'); // Importa a fremework express
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote cors para permitir requisições de diferentes origens

const dados = require('./configurar/dados'); // Importa a conexão com o banco de dados

// Inicializar nova aplicação Express

const app = express(); // Inicializar uma nova aplicação Express

// Configurar o CORS e o BADY-PARSE

app.use(cors()); // Habilita o CORS para todas as rotas
app.use(bodyParser.json()); // Configura o BODY-PARSER para analisar requisições JSON

const transactionsRoutes = require('./rotas/transactions')
// const authRoutes = require('./rotas/auth')
//Usar as rotas de TRANSAÇÕES e AUTENTICAÇÕES para as requisições

app.use('/api/transactions', transactionsRoutes); // Configura o servidor para usar as rotas de transações
// app.use('/api/auth', authRoutes); // Configura o servidor para usar as rotas de autenticação

// Rota inicial para testar o servidor

app.get('/', (req, res) => {
  res.send(`Servidor está rodando na porta ${PORT}`); // Define uma rota inicial para testar o servidor
});

//Configurar o servidor para uma porta específica

const PORT = process.env.PORT || 3000; // Define a porta a partir da variável de ambiente ou usa a porta 3000 como padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Loga uma mensagem informando que o servidor está rodando
});
