

const { TipoDireccion } = require('../models/tipoDireccion');
const { Controller } = require('./controller');

const control = Controller(TipoDireccion);



module.exports = control;