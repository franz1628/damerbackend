
const { ClasificadoReferencia } = require('../models/clasificadoReferencia');
const { Controller } = require('./controller');

const control = Controller(ClasificadoReferencia);

module.exports = control;