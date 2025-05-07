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

/************************************
 * OBTENER EJERCICIOS DE UNA RUTINA *
 ************************************/

getEjerciciosRutina: async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  let connection;

  try {
    connection = await conectsql();
    const [rows] = await connection.execute(
      "SELECT e.nombre_ejercicio AS ejercicio, re.series, re.repeticiones, re.descanso_segundos AS descanso, re.dia_semana AS dia, re.orden_ejercicio AS orden FROM rutina_ejercicios re JOIN ejercicios e ON re.idejercicio = e.idejercicio WHERE re.idrutina = ? ORDER BY re.dia_semana, re.orden_ejercicio;",
      [id]
    );
    console.log(rows);

    if(rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron ejercicios para la rutina con id " + id,
      });
    }

    res.json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    console.log("Error al obtener ejercicios de la rutina");
    res.status(500).json({
      status: "error",
      message: "Error al obtener ejercicios de la rutina" + error,
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

},

/*******************************
 * AGREGAR EJERCICIOS A RUTINA *
 *******************************/

postAgregarEjerciciosArutina: async (req, res) => {
  console.log(req.body);
  const { idrutina, idejercicio, dia_semana, series, repeticiones, descanso_segundos, orden_ejercicio } = req.body;
  let connection;

  try {
    connection = await conectsql();
    const [result] = await connection.execute(
      "INSERT INTO rutina_ejercicios (idrutina, idejercicio, dia_semana, series, repeticiones, descanso_segundos, orden_ejercicio) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idrutina, idejercicio, dia_semana, series, repeticiones, descanso_segundos ? descanso_segundos : null, orden_ejercicio ? orden_ejercicio : null]
    );
    console.log(result);

    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log("Error al agregar ejercicio a rutina");
    res.status(500).json({
      status: "error",
      message: "Error al agregar ejercicio a rutina" + error,
      error,
    });
  } finally {
    if (connection) {
      connection.close();
      console.log("Conexión cerrada");
    }
  }
},

}

module.exports = controller;

