

const { Controller } = require('./controller');
const { UsuarioVista } = require('../models/usuarioVista');

const control = Controller(UsuarioVista);

module.exports = control;