const conectsql = require('../config/configsql');


const controller = {


    /********************
    * OBTENER USUARIOS *
    ********************/
    getUsuarios: async (req, res) => {

        let connection;

        try{

            connection = await conectsql();
            const [rows] = await connection.execute('SELECT * FROM clientes');

            res.json({
                status: 'success',
                data: rows
                });
            }
        catch (error){
            console.log('Error al obtener a los clientes');
            res.status(500).json({
                status: 'error',
                message: 'Error al obtener los clientes',
                error
            });
        }
        finally{
            if (connection) {
                connection.close();
                console.log('Conexión cerrada');
            }
        }
    },


}

module.exports = controller; 