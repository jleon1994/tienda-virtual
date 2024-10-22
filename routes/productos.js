const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const producto = new Producto(req.body);
  try {
    const nuevoProducto = await producto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
