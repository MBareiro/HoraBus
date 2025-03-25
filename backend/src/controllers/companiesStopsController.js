//const { Company, Stop } = require('../../db/models');
const db = require('../../db/models');
const Stop = db.stops;
const Company = db.companies;

// Asociar paradas a una empresa
const associateStopsToCompany = async (req, res) => {  
  const { company_id } = req.params;
  const { stop_ids } = req.body;
  
  try {
    // Buscar la empresa
    const company = await Company.findByPk(company_id);
    if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });

    // Buscar las paradas
    const stops = await Stop.findAll({ where: { id: stop_ids } });
    if (stops.length !== stop_ids.length) return res.status(404).json({ error: 'Una o más paradas no se encuentran' });

    // Asociar las paradas a la empresa
    await company.addStops(stops);
    return res.status(200).json({ message: 'Paradas asociadas exitosamente', stops: stops });
  } catch (error) {
    return res.status(500).json({ error: 'Error al asociar paradas', details: error.message });
  }
};

// Eliminar la relación entre paradas y una empresa
const removeStopsFromCompany = async (req, res) => {
  const { company_id } = req.params;
  const { stop_ids } = req.body;

  try {
    // Buscar la empresa
    const company = await Company.findByPk(company_id);
    if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });

    // Buscar las paradas
    const stops = await Stop.findAll({ where: { id: stop_ids } });
    if (stops.length !== stop_ids.length) return res.status(404).json({ error: 'Una o más paradas no se encuentran' });

    // Eliminar la asociación de las paradas de la empresa
    await company.removeStops(stops);
    return res.status(200).json({ message: 'Paradas eliminadas exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar paradas', details: error.message });
  }
};

// Obtener las paradas asociadas a una empresa
const getStopsByCompany = async (req, res) => {
  const { company_id } = req.params;

  try {
    // Buscar la empresa e incluir las paradas asociadas
    const company = await Company.findByPk(company_id, {
      include: { model: Stop, as: 'stops', through: { attributes: [] } },
    });

    if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });

    return res.status(200).json(company.stops);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener paradas', details: error.message });
  }
};

// Obtener las empresas asociadas a una parada
const getCompaniesByStop = async (req, res) => {
  const { stop_id } = req.params;

  try {
    // Buscar la parada e incluir las empresas asociadas
    const stop = await Stop.findByPk(stop_id, {
      include: { model: Company, as: 'companies', through: { attributes: [] } },
    });

    if (!stop) return res.status(404).json({ error: 'Parada no encontrada' });

    return res.status(200).json(stop.companies);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener empresas', details: error.message });
  }
};

module.exports = {
  associateStopsToCompany,
  removeStopsFromCompany,
  getStopsByCompany,
  getCompaniesByStop,
};
