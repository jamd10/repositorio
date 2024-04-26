const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Estilos CSS para el diseño de la página
const styles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .container {
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input[type="text"],
  input[type="number"],
  button {
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    text-align: center;
    display: block;
    width: 100%;
  }

  button:hover {
    background-color: #0056b3;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  .btn-danger {
    background-color: #dc3545;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }
`;

// Datos de ejemplo para simular una base de datos de inventario
let inventario = [];

// Ruta para la página principal
app.get('/', (req, res) => {
  const menu = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Menú de Operaciones</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <h1>Menú de Operaciones</h1>
        <ul>
          <li><button onclick="window.location='/listar'">Listar</button></li>
          <li><button onclick="window.location='/agregar'">Agregar</button></li>
          <li><button onclick="window.location='/modificar'">Modificar</button></li>
          <li><button onclick="window.location='/eliminar'" class="btn-danger">Eliminar</button></li>
        </ul>
      </div>
    </body>
    </html>
  `;
  res.send(menu);
});

// Ruta para listar elementos del inventario
app.get('/listar', (req, res) => {
  const itemList = inventario.map((item, index) => `<li>${item.nombre} - Cantidad: ${item.cantidad}</li>`).join('');
  const page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Listar Elementos</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <h1>Listar Elementos</h1>
        <ul>${itemList}</ul>
        <button onclick="window.location='/'">Volver al Menú</button>
      </div>
    </body>
    </html>
  `;
  res.send(page);
});

// Ruta para mostrar el formulario de agregar elemento al inventario
app.get('/agregar', (req, res) => {
  const formulario = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Agregar Nuevo Elemento</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <h1>Agregar Nuevo Elemento</h1>
        <form action="/agregar" method="post">
          <label for="nombre">Nombre del producto:</label>
          <input type="text" id="nombre" name="nombre" value="" required><br>
          <label for="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" value="" required><br>
          <button type="submit">Agregar</button>
          <button onclick="window.location='/'">Volver al Menú</button>
        </form>
      </div>
    </body>
    </html>
  `;
  res.send(formulario);
});

// Ruta para agregar un nuevo elemento al inventario
app.post('/agregar', (req, res) => {
  const nuevoElemento = {
    nombre: req.body.nombre,
    cantidad: parseInt(req.body.cantidad)
  };
  inventario.push(nuevoElemento);
  res.redirect('/listar');
});

// Ruta para mostrar el formulario de modificar elemento del inventario
app.get('/modificar', (req, res) => {
  const page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Modificar Elemento</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <h1>Modificar Elemento</h1>
        <form action="/modificar" method="post">
          <label for="indice">Índice del elemento a modificar:</label>
          <input type="number" id="indice" name="indice" required><br>
          <label for="nombre">Nuevo nombre del producto:</label>
          <input type="text" id="nombre" name="nombre" required><br>
          <label for="cantidad">Nueva cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" required><br>
          <button type="submit">Modificar</button>
          <button onclick="window.location='/'">Volver al Menú</button>
        </form>
      </div>
    </body>
    </html>
  `;
  res.send(page);
});

// Ruta para modificar un elemento del inventario
app.post('/modificar', (req, res) => {
  const indice = parseInt(req.body.indice);
  if (indice >= 0 && indice < inventario.length) {
    inventario[indice].nombre = req.body.nombre;
    inventario[indice].cantidad = parseInt(req.body.cantidad);
  }
  res.redirect('/listar');
});

// Ruta para mostrar el formulario de eliminar elemento del inventario
app.get('/eliminar', (req, res) => {
  const page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Eliminar Elemento</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <h1>Eliminar Elemento</h1>
        <form action="/eliminar" method="post">
          <label for="indice">Índice del elemento a eliminar:</label>
          <input type="number" id="indice" name="indice" required><br>
          <button type="submit" class="btn-danger">Eliminar</button>
          <button onclick="window.location='/'">Volver al Menú</button>
        </form>
      </div>
    </body>
    </html>
  `;
  res.send(page);
});

// Ruta para eliminar un elemento del inventario
app.post('/eliminar', (req, res) => {
  const indice = parseInt(req.body.indice);
  if (indice >= 0 && indice < inventario.length) {
    inventario.splice(indice, 1);
  }
  res.redirect('/listar');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
