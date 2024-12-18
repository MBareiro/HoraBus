const db = require('../../db/models');
const { frequency: Frequency } = db; // Renombramos la constante para evitar conflictos

// Obtener todas las frecuencias
exports.getAllFrequency = async (req, res) => {
  try {
    const frequencies = await Frequency.findAll();
    res.status(200).json(frequencies);
  } catch (error) {
    console.error('Error al obtener las frecuencias:', error);
    res.status(500).json({ error: 'Error al obtener las frecuencias.' });
  }
};

// Obtener una frecuencia por ID
exports.getFrequencyById = async (req, res) => {
  try {
    const frequency = await Frequency.findByPk(req.params.id); // Cambio aquí
    if (frequency) {
      res.status(200).json(frequency); // Cambio aquí
    } else {
      res.status(404).json({ error: 'Frecuencia no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener la frecuencia:', error);
    res.status(500).json({ error: 'Error al obtener la frecuencia.' });
  }
};

// Crear una nueva frecuencia
exports.createFrequency = async (req, res) => {
  const { name } = req.body;

  try {
    // Verificar si la frecuencia ya existe
    const existingFrequency = await Frequency.findOne({ where: { name } });
    if (existingFrequency) {
      return res.status(409).json({ message: 'La frecuencia ya existe.' });
    }

    // Crear la nueva frecuencia
    const newFrequency = await Frequency.create({ name });
    res.status(201).json(newFrequency);
  } catch (error) {
    console.error('Error al crear la frecuencia:', error);
    res.status(500).json({ error: 'Error al crear la frecuencia.', details: error.message });
  }
};

// Actualizar una frecuencia existente
exports.updateFrequency = async (req, res) => {
  const { name } = req.body;

  try {
    const [updated] = await Frequency.update({ name }, { where: { id: req.params.id } });

    if (updated) {
      const updatedFrequency = await Frequency.findByPk(req.params.id);
      res.status(200).json(updatedFrequency);
    } else {
      res.status(404).json({ error: 'Frecuencia no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar la frecuencia:', error);
    res.status(500).json({ error: 'Error al actualizar la frecuencia.' });
  }
};

// Eliminar una frecuencia
exports.deleteFrequency = async (req, res) => {
  try {
    const deleted = await Frequency.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Frecuencia no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la frecuencia:', error);
    res.status(500).json({ error: 'Error al eliminar la frecuencia.' });
  }
};
