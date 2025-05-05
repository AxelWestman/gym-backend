var express = require('express');
var EjerciciosYrutinasController = require('../controllers/ejercicios_y_rutinas');
var router = express.Router();

/**************
 * RUTAS POST *
 **************/

router.post('/postEjercicios', EjerciciosYrutinasController.postEjercicios)

module.exports = router;