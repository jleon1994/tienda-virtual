const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Ruta de registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar usuario', error });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(400).json({ message: 'Contraseña incorrecta' });

    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

module.exports = router;
