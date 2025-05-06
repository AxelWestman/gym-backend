const conectsql = require("../config/configsql");

const controller = {

    /*********************
  * OBTENER EJERCICIOS *
  *********************/

    getEjercicios: async (req, res) => {
      let connection;
  
      try {
        connection = await conectsql();
        const [rows] = await connection.execute("SELECT * FROM ejercicios");
        console.log(rows);
  
        res.json({
          status: "success",
          data: rows,
        });
      } catch (error) {
        console.log("Error al obtener ejercicios");
        res.status(500).json({
          status: "error",
          message: "Error al obtener ejercicios" + error,
          error,
        });
      } finally {
        if (connection) {
          connection.close();
          console.log("Conexión cerrada");
        }
      }
    },

/*******************
 * OBTENER RUTINAS *
 *******************/

getRutinas: async (req, res) => {
  let connection;

  try {
    connection = await conectsql();
    const [rows] = await connection.execute("SELECT * FROM rutinas");
    console.log(rows);

    res.json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    console.log("Error al obtener rutinas");
    res.status(500).json({
      status: "error",
      message: "Error al obtener rutinas" + error,
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
  * AGREGAR EJERCICIOS *
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
},

/*******************
 * AGREGAR RUTINAS *
 *******************/
postRutinas: async (req, res) => {
  console.log(req.body);
  const {nombre_rutina, descripcion, duracion_semanas, nivel_dificultad} = req.body;
  let connection;

  try{
    connection = await conectsql();
    const [result] = await connection.execute(
      "INSERT INTO rutinas (nombre_rutina, descripcion, duracion_semanas, nivel_dificultad) VALUES (?, ?, ?, ?)",
      [nombre_rutina, descripcion ? descripcion : null, duracion_semanas ? duracion_semanas : null, nivel_dificultad ? nivel_dificultad : null]
    );
    console.log(result);

    res.json({
      status: "success",
      data: result,
    });
  } catch(error){
    console.log("Error al agregar rutina");
    res.status(500).json({
      status: "error",
      message: "Error al agregar rutina" + error,
      error,
    });
}
finally {
  if (connection) {
    connection.close();
    console.log("Conexión cerrada");
  }
}

}

}

module.exports = controller;

