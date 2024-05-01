// models/inventario.js
const mongoose = require('mongoose');

// Definición del esquema del inventario
const inventarioSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number
});

// Modelo del inventario
const Inventario = mongoose.model('Inventario', inventarioSchema);

module.exports = Inventario;
