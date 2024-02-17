
const { UnidadVenta } = require('../models/unidadVenta');
const { Controller } = require('./controller');

const control = Controller(UnidadVenta);

module.exports = control;