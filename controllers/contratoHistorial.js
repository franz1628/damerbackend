
const { ContratoHistorial } = require('../models/contratoHistorial');
const { Controller } = require('./controller');

const control = Controller(ContratoHistorial);

module.exports = control;