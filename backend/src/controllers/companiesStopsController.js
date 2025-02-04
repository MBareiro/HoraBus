const { Company, Stop } = require('../../db/models'); // Asumiendo que tienes estas relaciones configuradas en los modelos

// Asociar paradas a una empresa
const associateStopsToCompany = async (req, res) => {
    console.log('associateStopsToCompany');
    
  const { company_id } = req.params;
  const { stop_ids } = req.body;

  try {
    const company = await Company.findByPk(company_id);

    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    const stops = await Stop.findAll({
      where: {
        id: stop_ids,
      },
    });

    if (stops.length !== stop_ids.length) {
      return res.status(404).json({ error: 'Una o más paradas no se encuentran' });
    }

    // Asociar las paradas a la empresa
    await company.addStops(stops);

    return res.status(200).json({ message: 'Paradas asociadas a la empresa exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al asociar paradas' });
  }
};

// Eliminar la relación entre paradas y una empresa
const removeStopsFromCompany = async (req, res) => {
  const { company_id } = req.params;
  const { stop_ids } = req.body;

  try {
    const company = await Company.findByPk(company_id);

    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    const stops = await Stop.findAll({
      where: {
        id: stop_ids,
      },
    });

    if (stops.length !== stop_ids.length) {
      return res.status(404).json({ error: 'Una o más paradas no se encuentran' });
    }

    // Eliminar las relaciones entre las paradas y la empresa
    await company.removeStops(stops);

    return res.status(200).json({ message: 'Paradas eliminadas de la empresa exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar las paradas' });
  }
};

// Obtener las paradas asociadas a una empresa
const getStopsByCompany = async (req, res) => {
  const { company_id } = req.params;

  try {
    const company = await Company.findByPk(company_id, {
      include: { model: Stop, through: { attributes: [] } }, // Incluir las paradas relacionadas
    });

    if (!company) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    return res.status(200).json(company.Stops);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las paradas de la empresa' });
  }
};

// Obtener las empresas asociadas a una parada
const getCompaniesByStop = async (req, res) => {
  const { stop_id } = req.params;

  try {
    const stop = await Stop.findByPk(stop_id, {
      include: { model: Company, through: { attributes: [] } }, // Incluir las empresas relacionadas
    });

    if (!stop) {
      return res.status(404).json({ error: 'Parada no encontrada' });
    }

    return res.status(200).json(stop.Companies);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las empresas de la parada' });
  }
};

module.exports = {
  associateStopsToCompany,
  removeStopsFromCompany,
  getStopsByCompany,
  getCompaniesByStop,
};
