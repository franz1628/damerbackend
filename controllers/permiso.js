

const { Controller } = require('./controller');
const { Permiso } = require('../models/permiso');

const control = Controller(Permiso);

module.exports = control;