const express = require('express');
const { Sequelize } = require('sequelize');

// Inicializar la aplicación de Express
const app = express();

// Conectar a la base de datos usando Sequelize
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express!');
});

// Definir el puerto en el que la aplicación escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
