const conectsql = require("../config/configsql");

const controller = {
  /********************
   * OBTENER USUARIOS *
   ********************/
  getUsuarios: async (req, res) => {
    let connection;

    try {
      connection = await conectsql();
      const [rows] = await connection.execute("SELECT * FROM clientes");

      res.json({
        status: "success",
        data: rows,
      });
    } catch (error) {
      console.log("Error al obtener a los clientes");
      res.status(500).json({
        status: "error",
        message: "Error al obtener los clientes",
        error,
      });
    } finally {
      if (connection) {
        connection.close();
        console.log("Conexión cerrada");
      }
    }
  },

  /******************
   * CREAR USUARIOS *
   ******************/

  postUsuarios: async (req, res) => {
    console.log(req.body);
    datosUsuario = req.body;

    const { nombre_completo, dni, mail, telefono, genero } = req.body;

    let connection;

    try {
      connection = await conectsql();
      const [result] = await connection.execute(
        `INSERT INTO clientes (nombre_completo, dni, mail, telefono, genero) VALUES ('${nombre_completo}', '${dni}', '${mail}', '${telefono}', '${genero}')`
      );
      console.log(result);

      res.json({
        status: "success",
        message: "Usuario añadido correctamente",
      });
    } catch (error) {
      console.error("Error al añadir al usuario:", error);
      res.status(500).json({
        status: "error",
        message: "Error al añadir el usuario",
        error,
      });
    } finally {
      if (connection) {
        connection.close();
        console.log("Conexión cerrada");
      }
    }
  },

  /*********************
   * ELIMINAR USUARIOS *
   *********************/

  deleteUsuarios: async (req, res) => {
    const id = Number(req.params.id);
    console.log(id);

    let connection;

    try {
      connection = await conectsql();
      const [rows] = await connection.execute(
        `DELETE FROM clientes WHERE idclientes = ${id}`
      );
      console.log(rows);

      if (rows.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "El usuario que intenta eliminar no existe",
        });
      }

      res.json({
        status: "success",
        message: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error, el usuario que intenta eliminar no existe:", error);
      res.status(500).json({
        status: "error",
        message: "Error, el usuario que intenta eliminar no existe:",
        error,
      });
    } finally {
      if (connection) {
        connection.close();
        console.log("Conexión cerrada");
      }
    }
  },
};

module.exports = controller;
