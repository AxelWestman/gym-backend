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
router.post('/postLogueo',UsuariosController.postLoginUsuarios)

/****************
 * RUTAS DELETE *
 ****************/

router.delete('/deleteUsuarios/:id',UsuariosController.deleteUsuarios);

module.exports = router;