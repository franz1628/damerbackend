
const { TipoInformeOrden } = require('../models/tipoInformeOrden');
const { Controller } = require('./controller');

const control = Controller(TipoInformeOrden);

module.exports = control;