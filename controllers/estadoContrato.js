
const { EstadoContrato } = require('../models/estadoContrato');
const { Controller } = require('./controller');

const control = Controller(EstadoContrato);



module.exports = control;