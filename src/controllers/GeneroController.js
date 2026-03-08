const Genero = require('../models/Genero');

// Crear genero
// Crear genero
exports.crearGenero = async (req, res) => {
  try {

    const { nombre, descripcion } = req.body;

    // Validar que el nombre exista
    if (!nombre) {
      return res.status(400).json({
        mensaje: "El nombre del género es obligatorio"
      });
    }

    const genero = await Genero.create({
      nombre,
      descripcion
    });

    res.status(201).json({
      mensaje: "Genero creado correctamente",
      data: genero
    });

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al crear genero",
      error: error.message
    });

  }
};

// Listar generos
exports.obtenerGeneros = async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener uno
exports.obtenerGenero = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
exports.actualizarGenero = async (req, res) => {
  try {
    await Genero.update(req.body, {
      where: { id: req.params.id }
    });

    res.json({ mensaje: "Genero actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
exports.eliminarGenero = async (req, res) => {
  try {
    await Genero.destroy({
      where: { id: req.params.id }
    });

    res.json({ mensaje: "Genero eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};