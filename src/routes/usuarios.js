var express = require('express');
var UsuariosController = require('../controllers/usuarios');
var router = express.Router();

/*************
 * RUTAS GET *
 *************/

router.get('/getUsuarios',UsuariosController.getUsuarios);

/**************
 * RUTAS POST *
 **************/

router.post('/postUsuarios', UsuariosController.postUsuarios)

module.exports = router;