const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// Definición del esquema del inventario
const inventarioSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number
});

// Modelo del inventario
const Inventario = mongoose.model('Inventario', inventarioSchema);

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      <button class="button" onclick="window.location.href='/listar'">Listar</button>
      <button class="button" onclick="window.location.href='/agregar'">Agregar</button>
      <button class="button" onclick="window.location.href='/modificar'">Modificar</button>
      <button class="button" onclick="window.location.href='/eliminar'">Eliminar</button>
    </div>
  `);
});

// Ruta para listar elementos del inventario
app.get('/listar', async (req, res) => {
  try {
    const inventario = await Inventario.find();
    res.send(`
      <div style="text-align: center;">
        <h1>Listado de elementos del inventario</h1>
        <ul>
          ${inventario.map(item => `<li>${item.nombre} - Cantidad: ${item.cantidad}</li>`).join('')}
        </ul>
        <a href="/">Volver al Menú</a>
      </div>
    `);
  } catch (error) {
    console.error('Error al obtener el inventario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar el formulario de agregar elemento al inventario
app.get('/agregar', (req, res) => {
  res.send(`
    <div style="text-align: center;">
      <h1>Agregar Nuevo Elemento al Inventario</h1>
      <form action="/agregar" method="post">
        <label for="nombre">Nombre del producto:</label><br>
        <input type="text" id="nombre" name="nombre" required><br>
        <label for="cantidad">Cantidad:</label><br>
        <input type="number" id="cantidad" name="cantidad" required><br>
        <button type="submit">Agregar</button>
        <a href="/">Volver al Menú</a>
      </form>
    </div>
  `);
});

// Ruta para agregar un nuevo elemento al inventario
app.post('/agregar', async (req, res) => {
  try {
    const { nombre, cantidad } = req.body;
    await Inventario.create({ nombre, cantidad: parseInt(cantidad) });
    res.redirect('/listar');
  } catch (error) {
    console.error('Error al agregar un elemento:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar el formulario de modificar elemento del inventario
app.get('/modificar', (req, res) => {
  res.send(`
    <div style="text-align: center;">
      <h1>Modificar Elemento del Inventario</h1>
      <form action="/modificar" method="post">
        <label for="nombre">Nombre del producto a modificar:</label><br>
        <input type="text" id="nombre" name="nombre" required><br>
        <label for="cantidad">Nueva cantidad:</label><br>
        <input type="number" id="cantidad" name="cantidad" required><br>
        <button type="submit">Modificar</button>
        <a href="/">Volver al Menú</a>
      </form>
    </div>
  `);
});

// Ruta para modificar un elemento del inventario
app.post('/modificar', async (req, res) => {
  try {
    const { nombre, cantidad } = req.body;
    await Inventario.updateOne({ nombre }, { cantidad: parseInt(cantidad) });
    res.redirect('/listar');
  } catch (error) {
    console.error('Error al modificar un elemento:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar el formulario de eliminar elemento del inventario
app.get('/eliminar', (req, res) => {
  res.send(`
    <div style="text-align: center;">
      <h1>Eliminar Elemento del Inventario</h1>
      <form action="/eliminar" method="post">
        <label for="nombre">Nombre del producto a eliminar:</label><br>
        <input type="text" id="nombre" name="nombre" required><br>
        <button type="submit">Eliminar</button>
        <a href="/">Volver al Menú</a>
      </form>
    </div>
  `);
});

// Ruta para eliminar un elemento del inventario
app.post('/eliminar', async (req, res) => {
  try {
    const { nombre } = req.body;
    await Inventario.deleteOne({ nombre });
    res.redirect('/listar');
  } catch (error) {
    console.error('Error al eliminar un elemento:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
