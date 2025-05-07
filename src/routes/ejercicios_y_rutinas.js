var express = require('express');
var EjerciciosYrutinasController = require('../controllers/ejercicios_y_rutinas');
var router = express.Router();

/**************
 * RUTAS GET *
 **************/

router.get('/getEjercicios', EjerciciosYrutinasController.getEjercicios);
router.get('/getRutinas', EjerciciosYrutinasController.getRutinas);
router.get('/getEjerciciosRutinas/:id', EjerciciosYrutinasController.getEjerciciosRutina);

/**************
 * RUTAS POST *
 **************/

router.post('/postEjercicios', EjerciciosYrutinasController.postEjercicios);
router.post('/postRutinas', EjerciciosYrutinasController.postRutinas);
router.post('/postAgregarEjerciciosArutina', EjerciciosYrutinasController.postAgregarEjerciciosArutina);

module.exports = router;