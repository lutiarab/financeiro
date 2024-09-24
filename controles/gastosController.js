const dados = require('../configurar/dados'); // Importar a conexão com o banco de dados



//-------------------------------------------------------------------- Estoque de números -------------------------------------------------------------

// Função para obter todas as trasações
const getAllGastos = (req, res) => {
    dados.query('SELECT * FROM gastos_db', (err, results) => {
        if (err) {
            console.error('Erro ao ober o gastos:', err);
            res.status(500).send('Erro ao obter gastos');
            return;
        }
        res.json(results);
    });
};



// Função para adicionar uma nova transação

const addGastos = (req, res) => {
    const {entradas, saidas, total, valor, tipo, transactions_id} = req.body;

        // Verificar se a transação já existe

        dados.query('SELECT * FROM gastos_db WHERE  entradas=? AND saidas=? AND total=? AND valor=? AND tipo=? AND transactions_id=?', 
            [entradas, saidas, total, valor, tipo, transactions_id],
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
                'INSERT INTO gastos_db (entradas, saidas, total, valor, tipo, transactions_id) VALUES (?,?,?,?,?,?)',
                [entradas, saidas, total, valor, tipo, transactions_id],
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

const updateGastosPut = (req, res) => {
    const{id} = req.params;
    const {entradas, saidas, total, valor, tipo, transactions_id} = req.body;
    dados.query(
        'UPDATE gastos_db SET entradas = ?, saidas = ?, total = ?, valor = ?, tipo = ?, transactions_id = ? WHERE id = ?',
        [entradas, saidas, total, valor, tipo, transactions_id,id],
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

const updateGastosPatch = (req, res) => {
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
        `UPDATE gastos_db SET ${query.join(',')} WHERE id = ?`,
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

const deleteGastos = (req,res) => {
    const{id} = req.params;
    dados.query('DELETE FROM gastos_db WHERE id = ?',[id],
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
    getAllGastos,
    addGastos,
    updateGastosPut,
    updateGastosPatch,
    deleteGastos
}