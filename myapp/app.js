// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory'); // Importa las rutas de inventario

const app = express();
const port = 3000;

// Conexión a la base de datos MongoDB en la nube
mongoose.connect('mongodb+srv://jamd10:1234@vanguardia.swwqyho.mongodb.net/inventario', {
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
      </style>
      <button class="button" onclick="window.location.href='/inventory/listar'">Listar</button>
      <button class="button" onclick="window.location.href='/inventory/agregar'">Agregar</button>
      <button class="button" onclick="window.location.href='/inventory/modificar'">Modificar</button>
      <button class="button" onclick="window.location.href='/inventory/eliminar'">Eliminar</button>
    </div>
  `);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
