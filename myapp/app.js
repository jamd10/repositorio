// Primero, requiere y configura dotenv
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory'); // Importa las rutas de inventario
const axios = require('axios'); // Necesitarás instalar axios con npm install axios

const app = express();
const port = process.env.PORT || 3000; // Usa la variable de entorno PORT si está disponible

// Conexión a la base de datos MongoDB en la nube
mongoose.connect(process.env.MONGODB_URI, { // Usa la variable de entorno MONGODB_URI
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión a MongoDB establecida');
  })
  .catch(err => {
    console.error('Error de conexión a MongoDB:', err.message);
  });

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usa las rutas de inventario
app.use('/inventory', inventoryRoutes);

// Ruta para generar un usuario aleatorio
app.get('/randomuser', (req, res) => {
  axios.get(process.env.RANDOM_USER_API_URL) // Usa la variable de entorno RANDOM_USER_API_URL
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error al obtener el usuario aleatorio:', error.message);
      res.status(500).send('Error al obtener el usuario aleatorio');
    });
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send(`
    <div style="text-align: center;">
      <h1>Bienvenido a la aplicación de gestión de inventario</h1>
      <style>
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 20px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          outline: none;
          color: #fff;
          background-color: #4CAF50;
          border: none;
          border-radius: 15px;
          box-shadow: 0 9px #999;
          margin: 10px;
        }

        .button:hover {background-color: #3e8e41}

        .button:active {
          background-color: #3e8e41;
          box-shadow: 0 5px #666;
          transform: translateY(4px);
        }

        .randomUserButton {
          display: inline-block;
          padding: 10px 20px;
          font-size: 20px;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          outline: none;
          color: #fff;
          background-color: skyblue;
          border: none;
          border-radius: 15px;
          box-shadow: 0 9px #999;
          margin: 10px;
        }

        .randomUserButton:hover {background-color: deepskyblue}

        .randomUserButton:active {
          background-color: deepskyblue;
          box-shadow: 0 5px #666;
          transform: translateY(4px);
        }
      </style>
      <div>
        <button class="button" onclick="window.location.href='/inventory/listar'">Listar</button>
        <button class="button" onclick="window.location.href='/inventory/agregar'">Agregar</button>
        <button class="button" onclick="window.location.href='/inventory/modificar'">Modificar</button>
        <button class="button" onclick="window.location.href='/inventory/eliminar'">Eliminar</button>
      </div>
      <div style="margin-top: 20px;">
        <button class="randomUserButton" onclick="window.location.href='/randomuser'">RANDOM USER GENERATOR</button>
      </div>
    </div>
  `);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
