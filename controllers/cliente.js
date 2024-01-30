
const { Cliente } = require('../models/cliente');
const { Controller } = require('./controller');

const control = Controller(Cliente);

module.exports = control;