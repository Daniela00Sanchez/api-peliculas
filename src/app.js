const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const Genero = require('./models/Genero');
const generoRoutes = require('./routes/generoRoutes');

const app = express();
app.use(express.json());

app.use('/api', generoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

// Conectar base de datos y levantar servidor
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");

    return sequelize.sync(); // crea las tablas
  })
  .then(() => {
    console.log("Tablas sincronizadas");

    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("Error de conexión:", err);
  });