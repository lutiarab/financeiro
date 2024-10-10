const dados = require('../configurar/dados'); // Importar a conexão com o banco de dados



//-------------------------------------------------------------------- Estoque de números -------------------------------------------------------------

// Função para obter todas as trasações
const getAllTransacoes = (req, res) => {
    dados.query('SELECT * FROM transacoes', (err, results) => {
        if (err) {
            console.error('Erro ao ober o gastos:', err);
            res.status(500).send('Erro ao obter gastos');
            return;
        }
        res.json(results);
    });
};



// Função para adicionar uma nova transação

const addTransacoes = (req, res) => {
    const {tipo, descricao, valor, data, clientes_id} = req.body;

        // Verificar se a transação já existe

        dados.query('SELECT * FROM transacoes WHERE  tipo=? AND descricao=? AND valor=? AND data=? AND clientes_id=?', 
            [tipo, descricao, valor, data, clientes_id],
        (err, results) => {
            if(err) {
                console.error('Erro ao adicionar gastos', err);
                res.status(500).send('Erro ao adicionar gastos');
                return;
            }
            if(results.length>0){
                //se a transação já existe
                res.status(400).send('Transação duplicada')
        }

        // Se a transação não existe, insira-a no banco de dados
        
            dados.query(
                'INSERT INTO transacoes (tipo, descricao, valor, data, clientes_id) VALUES (?,?,?,?,?)',
                [tipo, descricao, valor, data, clientes_id],
                (err, results) => {
                    if(err) {
                        console.error('Erro ao adicionar gastos', err);
                        res.status(500).send('Erro ao adicionar gastos');
                        return;
                    }          
                    res.status(201).send('gastos adicionada com sucesso');
                }

            );
        }
    );
   
};



// Função para atualizar uma transação existente (Substituição Completa)

const updateTransacoesPut = (req, res) => {
    const{id} = req.params;
    const {tipo, descricao, valor, data, clientes_id} = req.body;
    dados.query(
        'UPDATE transacoes SET tipo = ?, descricao = ?, valor = ?, data = ?, clientes_id = ? WHERE id = ?',
        [tipo, descricao, valor, data, clientes_id, id],
        (err, results) => {
            if(err) {
                console.error('Erro ao atualizar gastos', err);
                res.status(500).send('Erro ao adicionar gastos');
                return; 
            }

        // verifica se nenhuma linha foi afetada pela consulta
        if(results.affectedRows===0){
            res.status(404).send('Transação não encontrada');
            return;
        }
  
        res.send('Gastos atualizado com sucesso');

        }
    );
};



// Função para atualizar uma transação existente (substituição parcial)

const updateTransacoesPatch = (req, res) => {
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
        `UPDATE transacoes SET ${query.join(',')} WHERE id = ?`,
        values,
        (err,results) => {
            if(err) {
                console.error('Erro ao atualizar gastos', err);
                res.status(500).send('Erro ao adicionar gastoso');
            return;
            }

        // verifica se nenhuma linha foi afetada pela consulta

            if(results.affectedRows===0){
                res.status(404).send('gastos não encontrada');
             return;
            }

            res.send('Gastos atualizado com sucesso');

        }
    );
};



//Função para deletar uma transação existente

const deleteTransacoes = (req,res) => {
    const{id} = req.params;
    dados.query('DELETE FROM transacoes WHERE id = ?',[id],
    (err,results) => {
        if(err) {
            console.error('Erro ao deletar gastos', err);
            res.status(500).send('Erro ao deletar gastos');
         return;
        }

        // verifica se nenhuma linha foi afetada pela consulta
        if(results.affectedRows===0){
            res.status(404).send('Gastos não encontrada');
            return; 
        }

        res.send('Gastos deletado com sucesso');
    }
    ); 
};

    
module.exports = {
    getAllTransacoes,
    addTransacoes,
    updateTransacoesPut,
    updateTransacoesPatch,
    deleteTransacoes
}