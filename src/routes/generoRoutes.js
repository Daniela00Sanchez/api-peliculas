const express = require('express');
const router = express.Router();

const generoController = require('../controllers/GeneroController');

router.post('/generos', generoController.crearGenero);
router.get('/generos', generoController.obtenerGeneros);
router.get('/generos/:id', generoController.obtenerGenero);
router.put('/generos/:id', generoController.actualizarGenero);
router.delete('/generos/:id', generoController.eliminarGenero);

module.exports = router;