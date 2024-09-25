const dados = require('../configurar/dados'); // Importar a conexão com o banco de dados



//-------------------------------------------------------------------- Estoque de números -------------------------------------------------------------

// Função para obter todas as trasações
const getAllEntrada = (req, res) => {
    dados.query('SELECT * FROM entrada', (err, results) => {
        if (err) {
            console.error('Erro ao ober o gastos:', err);
            res.status(500).send('Erro ao obter gastos');
            return;
        }
        res.json(results);
    });
};



// Função para adicionar uma nova transação

const addEntrada = (req, res) => {
    const {total, descricao, valor, tipo, clientes_id} = req.body;

        // Verificar se a transação já existe

        dados.query('SELECT * FROM entrada WHERE  total=? AND descricao=? AND valor=? AND tipo=? AND clientes_id=?', 
            [total, descricao, valor, tipo, clientes_id],
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
                'INSERT INTO entrada (total, descricao, valor, tipo, clientes_id) VALUES (?,?,?,?,?)',
                [total, descricao, valor, tipo, clientes_id],
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

const updateEntradaPut = (req, res) => {
    const{id} = req.params;
    const {total, descricao, valor, tipo, clientes_id} = req.body;
    dados.query(
        'UPDATE entrada SET total = ?, descricao = ?, valor = ?, tipo = ?, clientes_id = ? WHERE id = ?',
        [total, descricao, valor, tipo, clientes_id, id],
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

const updateEntradaPatch = (req, res) => {
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
        `UPDATE entrada SET ${query.join(',')} WHERE id = ?`,
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

const deleteEntrada = (req,res) => {
    const{id} = req.params;
    dados.query('DELETE FROM entrada WHERE id = ?',[id],
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
    getAllEntrada,
    addEntrada,
    updateEntradaPut,
    updateEntradaPatch,
    deleteEntrada
}