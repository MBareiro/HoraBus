const swaggerJSDoc = require('swagger-jsdoc');

// Configuración de Swagger (OpenAPI)
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Definir la versión de OpenAPI
    info: {
      title: 'API de HoraBus',
      version: '1.0.0',
      description: 'Documentación para la API construida con Express y Node.js',
    },
    servers: [
      {
        url: '/api',
        description: 'API base URL',
      },
    ],
    components: {
      schemas: {
        Bus: {
          type: 'object',
          required: ['company_id', 'line', 'bus_type', 'route_id'],
          properties: {
            id: { type: 'integer', description: 'ID único del bus' },
            company_id: { type: 'integer', description: 'ID de la compañía propietaria del bus' },
            line: { type: 'string', description: 'Número o nombre de la línea del bus' },
            bus_type: { type: 'string', description: 'Tipo de bus (Ej. urbano, interurbano)' },
            route_id: { type: 'integer', description: 'ID de la ruta a la que pertenece el bus' },
          },
          example: {
            id: 1,
            company_id: 1,
            line: 'Línea 101',
            bus_type: 'urbano',
            route_id: 2,
          },
        },
        Company: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: { type: 'integer', description: 'ID único de la compañía' },
            name: { type: 'string', description: 'Nombre de la compañía' },
          },
          example: {
            id: 1,
            name: 'Compañía ABC',
          },
        },
      },
    },
    tags: [
      { name: 'Buses', description: 'Operaciones relacionadas con buses' },
      { name: 'Companies', description: 'Operaciones relacionadas con compañías' },
      { name: 'Schedules', description: 'Operaciones relacionadas con horarios' }, 
    ],
  },
  apis: ['./src/routes/*.js'], // Incluir las rutas donde están los comentarios Swagger
};

// Genera la especificación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
