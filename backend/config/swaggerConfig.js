const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'API de HoraBus',
      version: '1.0.0',
      description: 'Documentación para la API construida con Express y Node.js',
    },
  },
  apis: ['./src/routes/*.js'], 
};
// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,  { customCssUrl: CSS_URL }));
};

module.exports = setupSwagger;
