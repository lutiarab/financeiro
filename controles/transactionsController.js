const dados = require('../configurar/dados'); // Importar a conexão com o banco de dados
 
// Função para obter todas as trasações
const getAllTransactions = (req, res) => {
    dados.query('SELECT * FROM transactions', (err, resuts) => {
        if (err) {
            console.error('Erro ao ober o transactions:', err);
            res.status(500).send('Erro ao obter transações');
            return;
        }
        res.json(results);
    });
};


//----------------------------- Com verificação de Duplicidade -------------------------------------------------------------


// Função para adicionar uma nova transação

const addTransaction = (req, res) => {
    const {data, amount, description, category, account, loguin_id} = req.body;

        // Verificar se a transação já existe

        dados.query('SELECT * FROM transactions WHERE  data=? AND amount=? AND description=? AND category=? AND account=? AND loguin_id=?', 
            [data, amount, description, category, account, loguin_id],
        (err, results) => {
            if(err) {
                console.error('Erro ao adicionar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return;
            }
            if(results.length>0){
                //se a transação já existe
                res.status(400).send('Transação duplicada')
        }

        // Se a transação não existe, insira-a no banco de dados
        
            db.query(
                'INSERT INTO transactions (data, amount, description, category, account, loguin_id) VALUES (?,?,?,?,?,?)',
                [data, amount, description, category, account, loguin_id],
                (err,results) => {
                    if(err) {
                        console.error('Erro ao adicionar transação', err);
                        res.status(500).send('Erro ao adicionar transação');
                        return;
                    }          
                    res.status(201).send('Transação adicionada com sucesso');
                }

            );
        }
    );
   
};



//----------------- Verificar se a Transação Existe (PUT, PATH, DELETE---------------------------------------------------


// Função para atualizar uma transação existente (Substituição Completa)

const updateTransactionPut = (req, res) => {
    const{id} = req.params;
    const {data, amount, description, category, account, loguin_id} = req.body;
    dados.query(
        'UPDATE transactions SET data = ?, amount = ?, description = ?, category = ?, account = ?, loguin_id = ? WHERE id = ?',
        [data, amount, description, category, account, loguin_id,id],
        (err, results) => {
            if(err) {
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return; 
            }

        // verifica se nenhuma linha foi afetada pela consulta
        if(results.affectedRows===0){
            res.status(404).send('Transação não encontrada');
            return;
        }
  
        res.send('Transação atualizada com sucesso');

        }
    );
};


// Função para atualizar uma transação existente (substituição parcial)

const updateTransactionPatch = (req, res) => {
    const{id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for(const[key,value] of Object.entries(fields)) {
        query.push (`${key} = ?`);
        values.push(value);
    }

    values.push(id);

    dados.query(
        `UPDATE transactions SET ${query.join(',')} WHERE id = ?`,
        values,
        (err,results) => {
            if(err) {
                console.error('Erro ao atualizar transação', err);
                res.status(500).send('Erro ao adicionar transação');
            return;
            }

        // verifica se nenhuma linha foi afetada pela consulta

            if(results.affectedRows===0){
                res.status(404).send('Transação não encontrada');
             return;
            }

            res.send('Transação atualizada com sucesso');

        }
    );
};


//Função para deletar uma transação existente

const deleteTransactions = (req,res) => {
    const{id} = req.params;
    dados.query('DELETE FROM transactions WHERE id = ?',[id],
    (err,results) => {
        if(err) {
            console.error('Erro ao deletar transação', err);
            res.status(500).send('Erro ao deletar transação');
         return;
        }

        // verifica se nenhuma linha foi afetada pela consulta
        if(results.affectedRows===0){
            res.status(404).send('Transação não encontrada');
            return; 
        }

        res.send('Transação deletada com sucesso');
    }
    ); 
};


module.exports = {
    getAllTransactions,
    addTransaction,
    updateTransactionPut,
    updateTransactionPatch,
    deleteTransactions
  };