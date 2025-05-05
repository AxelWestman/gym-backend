const conectsql = require("../config/configsql");

const controller = {

     /*********************
  * AGREGAAR EJERCICIOS *
  *********************/

  postEjercicios: async (req, res) => {
    console.log(req.body);

    const { nombre_ejercicio , descripcion, grupo_muscular, equipamiento_necesario } = req.body;

    let connection;

    try {
      connection = await conectsql();
      const [result] = await connection.execute(
        "INSERT INTO ejercicios (nombre_ejercicio, descripcion, grupo_muscular, equipamiento_necesario ) VALUES (?, ? , ?, ?)",
        [nombre_ejercicio, descripcion ? descripcion : null, grupo_muscular ? grupo_muscular : null, equipamiento_necesario ? equipamiento_necesario : null]
      );
      console.log(result);

     
      res.json({
        status: "success",
        data: result,
  });
}
catch (error) {
  console.log("Error al agregar ejercicio");
  res.status(500).json({
    status: "error",
    message: "Error al agregar ejercicio" + error,
    error,
  });
}finally {
    if (connection) {
      connection.close();
      console.log("Conexión cerrada");
    }
  }
}

};

module.exports = controller;

