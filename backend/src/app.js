const express = require('express');
const sequelize = require('./config/db');
const dotenv = require('dotenv');
dotenv.config(); 

// Inicializar la aplicación de Express
const app = express();
const companyRoutes = require('./routes/companyRoutes');

app.use('/api/companies', companyRoutes);

// Definir el puerto en el que la aplicación escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
