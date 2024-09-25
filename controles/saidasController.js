const dados = require('../configurar/dados'); // Importar a conexão com o banco de dados
 
// Função para obter todas as trasações
const getAllSaidas = (req, res) => {
    dados.query('SELECT * FROM saidas', (err, results) => {
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

const addSaidas = (req, res) => {
    const {total_saidas, descricao_saidas, valor_saidas, tipo_saidas, entrada_id} = req.body;

        // Verificar se a transação já existe

        dados.query('SELECT * FROM saidas WHERE  total_saidas=? AND descricao_saidas=? AND valor_saidas=? AND tipo_saidas=? AND entrada_id=?', 
            [total_saidas, descricao_saidas, valor_saidas, tipo_saidas, entrada_id],
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
        
            dados.query(
                'INSERT INTO saidas (total_saidas, descricao_saidas, valor_saidas, tipo_saidas, entrada_id) VALUES (?,?,?,?,?)',
                [total_saidas, descricao_saidas, valor_saidas, tipo_saidas, entrada_id],
                (err, results) => {
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

const updateSaidasPut = (req, res) => {
    const{id} = req.params;
    const {total_saidas, descricao_saidas, valor_saidas, tipo_saidas, entrada_id} = req.body;
    dados.query(
        'UPDATE saidas SET total_saidas = ?, descricao_saidas = ?, valor_saidas = ?, tipo_saidas = ?, entrada_id = ? WHERE id = ?',
        [total_saidas, descricao_saidas, valor_saidas, tipo_saidas, entrada_id,id],
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

const updateSaidasPatch = (req, res) => {
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
        `UPDATE saidas SET ${query.join(',')} WHERE id = ?`,
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

const deleteSaidas = (req,res) => {
    const{id} = req.params;
    dados.query('DELETE FROM saidas WHERE id = ?',[id],
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
    getAllSaidas,
    addSaidas,
    updateSaidasPut,
    updateSaidasPatch,
    deleteSaidas
  };