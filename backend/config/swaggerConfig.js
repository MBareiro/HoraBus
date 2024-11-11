const swaggerJSDoc = require('swagger-jsdoc');

// Configuración de Swagger (OpenAPI)
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Definir la versión de OpenAPI
    info: {
      title: 'API de HoraBus',
      version: '1.0.0',
      description: 'Documentación para la API construida con Express y Node.js',
    },
    basePath: '/api/', // Ruta base de la API
    components: {
      schemas: {
        // Definimos correctamente el esquema 'Company'
        Company: {
          type: 'object',
          required: ['id', 'name'], // Propiedades requeridas
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la compañía',
            },
            name: {
              type: 'string',
              description: 'Nombre de la compañía',
            },
          },
          example: {
            id: 1,
            name: 'Compañía ABC', // Ejemplo de cómo se vería una compañía
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Rutas donde están los comentarios Swagger
};

// Genera la especificación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
