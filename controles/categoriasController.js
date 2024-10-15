const dados = require('../configurar/dados'); // Importar a conexão com o banco de dados
 
// Função para obter todas as trasações
const getAllCategorias = (req, res) => {
    dados.query('SELECT * FROM categorias', (err, results) => {
        if (err) {
            console.error('Erro ao obter o transactions:', err);
            res.status(500).send('Erro ao obter transações');
            return;
        }
        res.json(results);
    });
};


//----------------------------- Com verificação de Duplicidade -------------------------------------------------------------


// Função para adicionar uma nova transação

const addCategorias = (req, res) => {
    const {descricao, transacoes_id} = req.body;

        // Verificar se a transação já existe

        dados.query('SELECT * FROM categorias WHERE descricao=? AND transacoes_id=?', 
            [descricao, transacoes_id],
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
                'INSERT INTO categorias (descricao, transacoes_id) VALUES (?,?)',
                [descricao, transacoes_id],
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

const updateCategoriasPut = (req, res) => {
    const{id} = req.params;
    const {descricao, transacoes_id} = req.body;
    dados.query(
        'UPDATE categorias SET descricao = ?, transacoes_id = ? WHERE id = ?',
        [descricao, transacoes_id,id],
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

const updateCategoriasPatch = (req, res) => {
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
        `UPDATE categorias SET ${query.join(',')} WHERE id = ?`,
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

const deleteCategorias = (req,res) => {
    const{id} = req.params;
    dados.query('DELETE FROM categorias WHERE id = ?',[id],
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
    getAllCategorias,
    addCategorias,
    updateCategoriasPut,
    updateCategoriasPatch,
    deleteCategorias
  };